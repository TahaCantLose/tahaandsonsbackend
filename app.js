import update from "./todb.js";
import express from "express";
import products from "./prodMongo.js";
import user from "./userMongo.js";
import bodyParser from "body-parser";
import cors from 'cors'
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/api/products", update);
app.get('/api/products/id/:id', async(req, res) => {
    res.send(await products.findById(req.params.id));
})
// app.post('/api/users', async(req,res) => {
//   const {email, password} = req.body;
//     if (await user.findOne({Email: email , Password: password})) {
//         res.status(200);
//     }else {
//       res.status(201).send("ACCOUNT NOT FOUND");
//     }
// })
app.post('/api/users', async (req, res) => {
    const userExists = await user.findOne({Email: req.body.email, Password: req.body.password});
    return userExists ? res.sendStatus(200) : res.status(201).send("Account Not Found"); 
})
app.post('/api/signup', async (req, res) => {
  const userExists = await user.findOne({Email: req.body.email, Password: req.body.password});
  if(userExists){
    return res.status(201).send('Account Already Exists');
  }else {
    await user.create({Email: req.body.email, Password: req.body.password});
  return res.status(200).send('Account Created');
  }
})

app.all('*', (req, res) => {
  res.send("Working");
});
app.listen(5000, () => console.log("Server is listening on port 5000"));
