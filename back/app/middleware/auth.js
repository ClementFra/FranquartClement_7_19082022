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

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};
