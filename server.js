const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDb = require("./db");
app.use(cors());
app.use(express.json());
const authModel = require("./model/authModel");
// const cookieParser = require('cookie-parser')
// app.use(cookieParser(process.env.REF_TOKEN_SECRET))

const createRefToken = (user) => {
  return jwt.sign(user, "thisisreftoken", { expiresIn: "1d" });
};

const createAccToken = (user) => {
  return jwt.sign(user, "thisisaccessToken", { expiresIn: "1d" });
};

app.post(`/api/register`, (req, res) => {
  const { firstName, lastName, password, conPassword, email } = req.body;

  const newUser = authModel({
    firstName,
    lastName,
    password,
    conPassword,
    email,
  });

  if (password === conPassword) {
    newUser.save();
    const accessToken = createAccToken({ email  });
    res.json({
      firstName: firstName,
      email: email,
      accessToken:accessToken
    });
  } else {
    res.status(401).json("Password and confrim Password is not matching");
  }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
  
    if (authHeader) {
      jwt.verify(token, "thisisaccessToken", (err, user) => {
        if (!err) {
          req.user = user;
          console.log('object :>> ', user);
          next();
        } else {
          return res.status(401).json("Token is not valid");
        }
      });
    } else {
      return res.status(402).json("access not found");
    }
  };

app.post(`/api/login`,verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;

    const extUser = await authModel.findOne({ email });
    if (!extUser) return res.status(400).json({ msg: "User doesn`t exists." });

    if (password !== extUser.password)
      return res.status(400).json({ msg: "password doesn`t match" });
    // res.json({data: extUser})
    // const accessToken = createAccToken({ id: extUser._id });
    res.json( "User Matched" );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const start = async () => {
  try {
    await connectDb(
      "mongodb+srv://Kiran:Vkikiran007@cluster0.ubsyq.mongodb.net/jwt?retryWrites=true"
    );
    app.listen(5000, () => {
      console.log(`server is listening on port http://localhost:5000`);
    });
  } catch (err) {
    throw err;
  }
};

start();
