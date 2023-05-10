const yup = require("yup");
const ObjectId = require("mongodb").ObjectId;

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message });
  }
};

const getSuppliersSchema = yup.object({
  query: yup.object({
    name: yup.string(),
    email: yup.string(),
    phoneNumber: yup
      .string()
      .matches(/^\d+$/, "phoneNumber is not valid Number"),
    address: yup.string(),
    skip: yup
      .string()
      .matches(/^\d+$/, "skip is not valid Number")
      .min(0)
      .max(1000),
    limit: yup
      .string()
      .matches(/^\d+$/, "limit is not valid Number")
      .min(0)
      .max(1000),
  }),
});

module.exports = { validateSchema, getSuppliersSchema };
