const jwt = require("jsonwebtoken");

// Control the authorization of connection for the user

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Decode the token
    const userId = decodedToken.userId; // Get userId as token userId
    const isAdmin = decodedToken.isAdmin;
    req.auth = { userId: userId, isAdmin: isAdmin };
    // Check if userId exist and if isn't the same return an error message, if it's ok continue
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ error: "User ID invalid" }); // If the user don't match with the token
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Unauthorized request." });
  }
};


