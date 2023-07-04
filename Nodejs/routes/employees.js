const passport = require("passport");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  passportConfigLocal,
  passportConfig,
} = require("../middlewares/passport");
const { Employee } = require("../models");
const yup = require("yup");
const jwt = require("jsonwebtoken");
const { authenToken } = require("../helpers/authenToken");

const {
  validateSchema,
  loginSchema,
  getEmployeeChema,
  employeeBodySchema,
  employeeIdSchema,
} = require("../validation/employee");
const { encodeToken, encodeRefreshToken } = require("../helpers/jwtHelper");

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
    const { email, phoneNumber } = req.body;

    const customerExists = await Employee.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (customerExists) {
      return res
        .status(400)
        .send({ oke: false, message: "Email or Phone Number already exists" });
    } else {
      const newItem = req.body;
      const data = new Employee(newItem);
      let result = await data.save();
      return res
        .status(200)
        .send({ oke: true, message: "Created succesfully", result: result });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

router.post("/refreshToken", async (req, res, next) => {
  const { refreshToken, id } = req?.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const checkEmployee = await Employee.findById(id);
  const EmployeeRefreshToken = checkEmployee.refreshToken;
  if (!EmployeeRefreshToken) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    const { _id, empEmail, firstName, lastName } = data;

    const accessToken = encodeToken(_id, empEmail, firstName, lastName);
    res.json({ accessToken });
  });
});

router.post(
  "/login",
  validateSchema(loginSchema),
  // passport.authenticate("local", { session: false }),
  passport.authenticate(passportConfigLocal(Employee), { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      console.log("««««« email »»»»»", email);
      const employee = await Employee.findOne({ email });

      if (!employee) return res.status(404).send({ message: "Not found" });

      const { _id, email: empEmail, firstName, lastName } = employee;

      const token = encodeToken(_id, empEmail, firstName, lastName);

      const refreshToken = encodeRefreshToken(
        _id,
        empEmail,
        firstName,
        lastName
      );
      console.log("««««« token, refreshToken »»»»»", token, refreshToken);
      // await Employee.findByIdAndUpdate(employee._id, {
      //   refreshToken: refreshToken,
      // });

      res.status(200).json({
        token,
        refreshToken,
        userId: employee._id,
        // payload: employee,
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: "Login Unsuccessful",
      });
    }
  }
);

// function authenToken(req, res, next) {
//   const authorizationHeader = req.headers["authorization"];

//   const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
//   if (!token) {
//     return res
//       .status(401)
//       .json({ oke: false, message: "Token is not defined" });
//   }

//   jwt.verify(token, process.env.SECRET, (err, data) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ oke: false, message: "JWT's valid", err: err.message });
//     }

//     next();
//   });
// }
router.get(
  "/login/profile",
  // passport.authenticate("jwt", { session: false }),
  authenToken,
  passport.authenticate(passportConfig(Employee), { session: false }),
  async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.user._id);

      if (!employee) return res.status(404).send({ message: "Not found" });
      const responseData = {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        birthday: employee.birthday,
      };

      res.status(200).json(responseData);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;
