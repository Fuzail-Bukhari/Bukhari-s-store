import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name:     { type: String, required: true },
      price:    { type: Number, required: true },
      quantity: { type: Number, required: true },
      image:    { type: String },
    }
  ],
  shippingAddress: {
    street:  { type: String, required: true },
    city:    { type: String, required: true },
    country: { type: String, required: true },
  },
  totalPrice:  { type: Number, required: true },
  isPaid:      { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);