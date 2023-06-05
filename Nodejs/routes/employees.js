const passport = require("passport");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { Employee } = require("../models");
const yup = require("yup");

const {
  validateSchema,
  loginSchema,
  getEmployeeChema,
  employeeBodySchema,
  employeeIdSchema,
} = require("../validation/employee");
const encodeToken = require("../helpers/jwtHelper");

const ObjectId = require("mongodb").ObjectId;

// Get all on Multiple conditions
router.get(
  "/",

  async (req, res, next) => {
    try {
      const {
        Locked,
        email,
        firstName,
        lastName,
        phoneNumber,
        birthdayFrom,
        birthdayTo,
        address,
        skip,
        limit,
      } = req.query;

      let fromDate = null;
      if (birthdayFrom) {
        fromDate = new Date(birthdayFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (isNaN(fromDate.getTime())) {
          throw new Error("Invalid date format for birthdayFrom");
        }
      }

      let toDate = null;
      if (birthdayTo) {
        const tempToDate = new Date(birthdayTo);
        toDate = new Date(tempToDate.setDate(tempToDate.getDate() + 1));
        toDate.setHours(0, 0, 0, 0);
        if (isNaN(toDate.getTime())) {
          throw new Error("Invalid date format for birthdayTo");
        }
      }

      const query = {
        $expr: {
          $and: [
            Locked && { $eq: ["$Locked", Locked] },
            email && {
              $regexMatch: { input: "$email", regex: email, options: "i" },
            },
            firstName && {
              $regexMatch: {
                input: "$firstName",
                regex: firstName,
                options: "i",
              },
            },
            lastName && {
              $regexMatch: {
                input: "$lastName",
                regex: lastName,
                options: "i",
              },
            },
            fromDate && { $gte: ["$birthday", fromDate] },
            toDate && { $lte: ["$birthday", toDate] },
            address && {
              $regexMatch: {
                input: "$address",
                regex: address,
                options: "i",
              },
            },
            phoneNumber && {
              $regexMatch: {
                input: "$phoneNumber",
                regex: phoneNumber,
                options: "i",
              },
            },
          ].filter(Boolean),
        },
      };

      let results = await Employee.find(query)
        .sort({ Locked: 1 })
        .skip(skip)
        .limit(limit);

      let amountResults = await Employee.countDocuments(query);
      res.json({ results: results, amountResults: amountResults });
    } catch (error) {
      res.status(500).json({ ok: false, error: error.message });
    }
  }
);

// GET A DATA
router.get("/:id", validateSchema(employeeIdSchema), async (req, res, next) => {
  const itemId = req.params.id;
  let found = await Employee.findById(itemId);
  if (found) {
    return res.status(200).json({ oke: true, result: found });
  }
  return res.status(410).json({ oke: false, message: "Object not found" });
});
// POST DATA
router.post("/", validateSchema(employeeBodySchema), async (req, res, next) => {
  try {
    const newItem = req.body;
    let data = new Employee(newItem);
    let found = await data.save();
    return res.status(200).json({ oke: true, result: found });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete(
  "/:id",
  validateSchema(employeeIdSchema),
  async (req, res, next) => {
    const itemId = req.params.id;
    let found = await Employee.findByIdAndDelete(itemId);
    if (found) {
      return res.status(200).json({ oke: true, result: found });
    }
    return res.status(410).json({ oke: false, message: "Object not found" });
  }
);

// PATCH DATA
router.patch(
  "/:id",
  validateSchema(employeeIdSchema),

  async (req, res, next) => {
    const itemId = req.params.id;
    const itemBody = req.body;

    try {
      // Check if the "password" field is present in the request body
      //Mã hóa password
      if (itemBody.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(itemBody.password, salt);
        itemBody.password = hashPass;
      }

      const updatedItem = await Employee.findByIdAndUpdate(
        itemId,
        ///$set : the $set operator is used to update the specified fields of a document. ( chỉ cập nhật trườn chỉ định
        // mà không cập nhật các trường khác)
        { $set: itemBody },
        { new: true }
      );

      if (updatedItem) {
        return res.status(200).json({ oke: true, result: updatedItem });
      } else {
        return res
          .status(410)
          .json({ oke: false, message: "Object not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  validateSchema(loginSchema),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const employee = await Employee.findOne({ email });

      console.log(employee);
      if (!employee) return res.status(404).send({ message: "Not found" });

      const { _id, email: empEmail, firstName, lastName } = employee;

      const token = encodeToken(_id, empEmail, firstName, lastName);

      console.log(token);
      res.status(200).json({
        token,
        payload: employee,
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: "Login Unsuccessful",
      });
    }
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.user._id);

      if (!employee) return res.status(404).send({ message: "Not found" });

      res.status(200).json(employee);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;
