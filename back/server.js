// Define variables extensions
const express = require("express");
const cors = require("cors");
const app = express();
require("./app/config/db.config");
require("dotenv").config();
const router = require("./app/routes/index");
const cookieParser = require('cookie-parser');
const path= require("path");

// Settings cors
var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true
};

// Setting
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware corps
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Security app

app.use(mongoSanitize());
app.use(helmet.crossOriginEmbedderPolicy());

// Path for images

app.use("/images", express.static(path.join(__dirname, "images")));

// Port listener for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
