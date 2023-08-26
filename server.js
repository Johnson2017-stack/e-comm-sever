import express from "express";
import cors from "cors";
import "./loadEnviroment.mjs";
import mongoose from "mongoose";
import 'dotenv/config' 
import bodyParser from "body-parser";

const PORT = process.env.PORT || "";
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json())

const dbConnection = async () => {
  await mongoose.connect(process.env.ATLAS_URI)
 
  console.log(`Connected to Database successfully!`)
}

dbConnection();

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})
