const express = require("express");
const ErrorHandler = require("./middlewares/error");
const Post = require("./routes/post");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api",Post);

//Error Handler middleware
app.use(ErrorHandler);
module.exports = app;
