import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.CON_STR;
mongoose
  .connect(password)
  .then(() => {
  })
  .catch(() => {
    console.log("FAILED MR");
  });
const Schema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
    company: {
    type: String,
    required: true,
  },
    color: {
    type: String,
    required: true,
  },
    shipping: {
    type: Boolean,
    required: true,
  },
});
const products = mongoose.model("Products", Schema);
export default products;
