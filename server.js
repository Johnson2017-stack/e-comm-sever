import express from "express";
import cors from "cors";
import "./loadEnviroment.mjs";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import customerinfo from "./models/customerinfo.js";

const PORT = process.env.PORT || "";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const dbConnection = async () => {
  await mongoose.connect(process.env.ATLAS_URI);

  console.log(`Connected to Database successfully!`);
};

dbConnection();

app.post("/api/payment", (req, res) => {
  const customer = new customerinfo({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    cardNumber: req.body.cardNumber,
    expirationDate: req.body.expirationDate,
    cv: req.body.cv,
  });
  customer.save().then((result) => {
    res.status(200).send({
      result,
    });
  });
});
app.get("/api/customer", cors(), (req, res) => {
  customerinfo.find({}).then((customers) => {
    res.status(200).json(customers);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
