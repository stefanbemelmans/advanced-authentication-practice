// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import authenticationRoutes from "./routes/AuthenticationRoutes";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/authentication-practice");

const app = express();

app.use(bodyParser.json());
app.use(authenticationRoutes);

app.use(function authChecker(req, res, next) {
  // implement some logic to determine if you should allow this request
  if (true) {
      next();
  } else {
      res.send("Secured");
  }
});

app.get("/api/anyonecanseethis", function (req, res) {
  res.send("Hooray, I am not secured. Anyone can get this data");
});

const authStrategy = passport.authenticate("authStrategy", { session: false });
app.use(authStrategy);

app.get("/api/canigetthis", function (req, res) {
  res.send("You got the data. You are authenticated");
});
app.get("/api/secret", function (req, res) {
  res.send(`The current user is ${req.user.username}`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
