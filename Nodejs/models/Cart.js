const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, min: 0, max: 75, default: 0 },
  imageUrl: { type: String },
});

const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        product: productSchema,
        quantity: { type: Number },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
