const express = require("express");
const router = express.Router();
const yup = require("yup");
const { Supplier } = require("../models");
const ObjectId = require("mongodb").ObjectId;
const {
  validateSchema,
  getSuppliersSchema,
} = require("../validation/supplier");

//Get all Data
// router.get("/", async (req, res, next) => {
//   try {
//     let found = await Supplier.find();
//     res.json(found);
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// });

//Get a Data
// Get all on Multiple conditions
router.get("/", validateSchema(getSuppliersSchema), async (req, res, next) => {
  try {
    const {
      active,
      isDeleted,
      name,
      email,
      phoneNumber,
      address,
      skip,
      limit,
    } = req.query;

    const query = {
      $and: [
        active === "true" ? { active: true, isDeleted: false } : null,
        active === "false" ? { active: false, isDeleted: false } : null,
        isDeleted === "true" ? { isDeleted: true } : null,
        name ? { name: { $regex: new RegExp(name, "i") } } : null,
        email ? { email: { $regex: new RegExp(email, "i") } } : null,
        phoneNumber
          ? { phoneNumber: { $regex: new RegExp(phoneNumber, "i") } }
          : null,
        address ? { address: { $regex: new RegExp(address, "i") } } : null,
      ].filter(Boolean),
    };

    let results = await Supplier.find(query)
      .sort({ isDeleted: 1 })
      .skip(Number(skip))
      .limit(Number(limit));

    let amountResults = await Supplier.countDocuments(query);

    res.json({ results, amountResults });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

router.post("/", async (req, res, next) => {
  const validationSchema = yup.object().shape({
    body: yup.object({
      id: yup.number(),
      name: yup.string().required().max(100),
      email: yup.string().required().max(50),
      phoneNumber: yup.string().max(50),
      address: yup.string().required().max(100),
    }),
  });
  validationSchema
    .validate({ body: req.body }, { abortEarly: false })
    .then(async () => {
      try {
        const newItem = req.body;
        let data = new Supplier(newItem);
        let result = data.save();
        return res.status(200).json({
          oke: true,
          message: "Created successfully!",
          result: result,
        });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provier: "Yup",
      });
    });
});
router.delete("/:id", async (req, res, next) => {
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup
        .string()
        .test(
          "Validate ObjectId",
          "${path} is not a valid ObjectId",
          (value) => {
            return ObjectId.isValid(value);
          }
        ),
    }),
  });
  validationSchema
    .validate({ params: req.params }, { abortEarly: false })
    .then(async () => {
      const itemId = req.params.id;
      let found = await Supplier.findByIdAndDelete(itemId);
      if (found) {
        return res.status(200).json({
          oke: true,
          message: "Deleted Successfully!!",
          result: found,
        });
      }
      return res.status(500).json({ oke: true, message: "Delete Error!!" });
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provider: "yup",
      });
    });
});
router.patch("/:id", async (req, res, next) => {
  const validationSchema = yup.object().shape({
    params: yup.object({
      id: yup
        .string()
        .test(
          "Validate ObjectId",
          "${path} is not a valid ObjectId",
          (value) => {
            return ObjectId.isValid(value);
          }
        ),
    }),
    body: yup.object({
      id: yup.number(),
      name: yup.string().max(100),
      email: yup.string().max(50),
      phoneNumber: yup.string().max(50),
      address: yup.string().max(100),
    }),
  });
  validationSchema
    .validate({ params: req.params }, { body: req.body }, { abortEarly: false })
    .then(async () => {
      const itemId = req.params.id;
      const itemBody = req.body;
      await Supplier.findByIdAndUpdate(itemId, itemBody);
      let found = await Supplier.findById(itemId);
      if (found) {
        return res.status(200).json({
          oke: true,
          message: "Updated Successfully!!",
          update: found,
        });
      }
      return res.status(500).json({ oke: true, message: "Updated Erorr!!" });
    })
    .catch((err) => {
      return res.status(400).json({
        type: err.name,
        errors: err.errors,
        message: err.message,
        provider: "yup",
      });
    });
});
module.exports = router;
