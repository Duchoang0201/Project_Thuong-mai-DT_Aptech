const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FeatureSchema = Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String },
    sortOder: { type: Number, required: true },
    active: { type: Boolean, required: true },
    note: { type: String },
    createdDate: {
      type: Date,
    },
    createdBy: { type: Object },
    updatedDate: {
      type: Date,
    },
    updatedBy: { type: Object },
    isDeleted: { trype: Boolean },
  },
  {
    versionKey: false,
  }
);

const Feature = model("Feature", FeatureSchema);

module.exports = Feature;
