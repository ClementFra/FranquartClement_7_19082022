const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const fs = require("fs");
require("dotenv").config();

/*****************************************************************
 *****************  ENCRYPT THE USER EMAIL   *********************
 *****************************************************************/
function encrypt(data) {
  const encrypted = cryptoJS.AES.encrypt(
    data,
    cryptoJS.enc.Utf8.parse(process.env.SECRET_KEY),
    {
      iv: cryptoJS.enc.Utf8.parse(process.env.IV),
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
}

/*****************************************************************
 *****************  DECRYPT THE USER EMAIL   *********************
 *****************************************************************/
function decrypt(data) {
  const decrypted = cryptoJS.AES.decrypt(
    data,
    cryptoJS.enc.Utf8.parse(process.env.SECRET_KEY),
    {
      iv: cryptoJS.enc.Utf8.parse(process.env.IV),
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(cryptoJS.enc.Utf8);
}

/*****************************************************************
 *****************     USER SIGNIN           *********************
 *****************************************************************/
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // Hash the password
    .then((hash) => {
      const user = new User({
        email: encrypt(req.body.email), // EncrypString the email
        password: hash,
        username: req.body.username,
        isAdmin: req.body.isAdmin,
      });
      console.log(user.email);
      user
        .save() // Save the user
        .then((newUser) => {
          console.log(newUser.email);
          user.email = decrypt(newUser.email);
          res.status(201).json(hateoasLinks(req, newUser, newUser._id)); // Create the user
        })
        .catch((error) => res.status(400).json({ error })); // Error bad request
    })
    .catch((error) => res.status(500).json({ error })); // Internal Error Server
};

/*****************************************************************
 *****************     USER LOGING           *********************
 *****************************************************************/
 exports.login = (req, res, next) => {
  const encryptedEmail = encrypt(req.body.email);

  User.findOne({ email: encryptedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      user.email = decrypt(user.email);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Your password is incorrect !" });
          }

          const accessToken = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.TOKEN_SECRET,
            { expiresIn: "12h" }
          );

          const refreshToken = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.REFRESH_TOKEN,
            { expiresIn: "24h" }
          );
          const userSend = hateoasLinks(req, user, user._id);

          res.cookie("jwt", refreshToken, {
            httpOnly: true, 
            sameSite: "None", 
            maxAge: 1000 * 60 * 60 * 24,
          });

          res.status(200).json({
            userId: user._id,
            token: accessToken,
            refreshToken: refreshToken,
            userSend,
          });
        })
        .catch((error) => {
          const errors = logInErrors(error);
          res.status(500).send({ errors });
        });
    })
    .catch((error) => res.status(500).json(error));
};


/*****************************************************************
 *****************     REFRESH TOKEN           *******************
 *****************************************************************/
 exports.refresh = (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN
    );
    const userId = decodedRefreshToken.userId;
    req.auth = {
      userId,
    };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      const accessToken = jwt.sign(
        {
          userId: decodedRefreshToken.userId,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: DURATION_REFRESH_TOKEN,
        }
      );
      res.json({
        accessToken,
      });
    }
  } catch {
    res.status(403).json({
      error: new Error("Unauthorized request!"),
    });
  }
}

/*****************************************************************
 *****************     USER LOGOUT          **********************
 *****************************************************************/
exports.logout = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  User.findById(req.auth.userId)
    .then(() => {
      res.clearCookie("jwt", {
        httpOnly: true,
      });
      res.redirect("/");
      res.status(200).json({
        message: "user logged out",
      });
    })
    .catch((error) => res.status(404).json(error));
};

/*****************************************************************
 *****************       READ THE USER       *********************
 *****************************************************************/
exports.readUser = (req, res, next) => {
  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" }); // Error not found
      } else {
        user.email = decrypt(user.email);
        res.status(200).json(hateoasLinks(req, user)); // Request ok
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

/*****************************************************************
 *****************    READ ONE USER           ********************
 *****************************************************************/

exports.readOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: "User not found!",
        });
      } else {
        user.email = decrypt(user.email);
        user.avatarUrl = `${req.protocol}://${req.get("host")}${
          user.avatarUrl
        }`;
        res.status(200).json(hateoasLinks(req, user, user._id));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

/*****************************************************************
 *****************  EXPORT THE USER DATA     *********************
 *****************************************************************/
exports.exportUser = (req, res, next) => {
  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        // Error if user was not found
        res.status(404).json({
          message: "User not found!", // Error not found
        });
      } else {
        user.email = decrypt(user.email);
        const userText = user.toString();
        res.attachment("user-data.txt");
        return res.status(200).json(userText); // Request ok
      }
    })
    .catch(
      (error) => res.status(500).json({ error }) // Internal Error Server
    );
};

/*****************************************************************
 *****************  UPDATE THE USER SETUP    *********************
 *****************************************************************/
exports.updateUser = (req, res, next) => {
  User.findById(req.auth.userId)
    .then(async (user) => {
      if (!user) {
        res.status(404).json({ message: "user not found" }); // Error not found
      } else {
        const update = {};
        if (req.body.email) {
          update.email = encrypt(req.body.email);
        }
        if (req.body.password) {
          const hash = await bcrypt.hash(req.body.password, 10);
          update.password = hash;
        }
        // Check image
        const userObject = req.file ? {
          ...update,
          imageUrl: `/images/${req.file.filename}`
        } : {
          ...update
        };
        const filename = user.imageUrl.split("/images/")[1];
        try {
          if (userObject.imageUrl) {
            fs.unlinkSync(`images/${filename}`);
          }
        } catch (error) {
          console.log(error);
        }
        // Update user new info in database
        User.findByIdAndUpdate({ _id: req.auth.userId }, update)
        .then((userUpdate) => {
            userUpdate.email = decrypt(userUpdate.email);
            res.status(200).json(hateoasLinks(req, userUpdate, userUpdate._id)); // Request ok
          }
        );
      }
    })
    .catch((error) => res.status(500).json(error)); // Internal Error Server
};
/*****************************************************************
 *****************     DELETE THE USER       *********************
 *****************************************************************/
exports.deleteUser = (req, res, next) => {
  User.findById(req.auth.userId) // Find user and delete
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" }); // Error not found
      } else {
        User.deleteOne({
          _id: req.auth.userId,
        })
          .then(() => {
            res.status(204).send();
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch(
      (error) => res.status(500).json({ error }) // Internal Error Server
    );
};

/*****************************************************************
 *****************    HATEOAS FOR USERS     **********************
 *****************************************************************/
const hateoasLinks = (req, user) => {
  const URI = `${req.protocol}://${req.get("host") + "/api/auth/"}`;
  const hateoas = [
    {
      rel: "read",
      title: "Read",
      href: URI+ user.id,
      method: "GET",
    },
    {
      rel: "readOneUser",
      title: "ReadOneUser",
      href: URI,
      method: "GET",
    },
    {
      rel: "export",
      title: "Export",
      href: URI + "export",
      method: "GET",
    },
    {
      rel: "update",
      title: "Update",
      href: URI,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "Delete",
      href: URI,
      method: "DELETE",
    },
  ];
  return {
    ...user._doc,
    links: hateoas,
  };
};
