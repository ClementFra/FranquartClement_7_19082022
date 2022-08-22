// Define variables extensions
const express = require("express");
const cors = require("cors");
const app = express();
require("./config/db.config");
require("dotenv").config();

// Settings cors
var corsOptions = {
  origin: "http://localhost:8080",
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
  res.setHeader(`Cross-Origin-Ressource-policy`, `same-site`);
  next();
});

// Middleware corps
app.use(cors(corsOptions));
app.use(express.json());

// Security

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Security app

app.use(mongoSanitize());
app.use(helmet.crossOriginEmbedderPolicy());

// Port listener for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
