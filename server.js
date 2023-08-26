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

app.post("/api/signup", cors(), (req, res) => {
  bcrypt.hash(req.body.password, 10)
      .then((saltedPassword) => {
          const user = new User (
              {
              userName: req.body.userName,
              email: req.body.email,
              password: saltedPassword
              }
          )
          user.save()
          .then((result) => {
              res.status(200).send({
                  result,
              })
          })
      })
})

app.post("/api/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
  const user = await User.findOne({ userName });
  if (!user) {
      return res.status(404).json({ error: "Incorrect username/password" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
      return res.status(404).json({ error: "Incorrect username/password" });
  }
  req.session.userId = user._id;
  await req.session.save();
  res.sendStatus(200);
  } catch (err) {
      console.error("Error logging in:", err);
      res.sendStatus(500);
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})
