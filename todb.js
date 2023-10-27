import products from "./prodMongo.js";
import users from "./userMongo.js";
import data from "./data.js";
import express from "express";
import cors from 'cors'
const update = express.Router();
update.get("/", cors(), async (req, res) => {
  try {
  await products.deleteMany();
  await products.insertMany(data.Products);
  // await users.insertMany(data.Users);
  await users.updateOne(
    {Email : data.Users.Email},
    {Password : data.Users.Password}
  )
  res.status(200).send(await products.find());
  } catch (error) {
    console.log(error);
  }
});
export default update;
