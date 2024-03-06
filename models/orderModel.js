import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderid: {
    type: String
  },
  products: [
    {
      type: String
    }
  ],
  orderid: {
    type: String
  }, orderdate: {
    type: String
  }, shipaddress: {
    type: String
  },
  billaddress: {
    type: String
  },
  total: {
    type: Number
  },
});

export default mongoose.model("Order", orderSchema);