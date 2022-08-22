// Define variables extensions
const express = require("express");
const cors = require("cors");
const app = express();


// Settings cors
var corsOptions = {
    origin: "http://localhost:4200",
  };

// Middleware corps
app.use(cors(corsOptions));
app.use(express.json());


// Port listener for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
