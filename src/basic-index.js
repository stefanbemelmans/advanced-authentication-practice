require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import basicAuthenticatedRoutes from "./routes/BasicAuthenticatedRoutes";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/todo-list-app");

const app = express();

app.use(bodyParser.json());
app.use(basicAuthenticatedRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
