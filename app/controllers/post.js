// Import the post model
const Post = require("../models/post");
// File system
const fs = require("fs");

/*****************************************************************
 *****************  READ POST BY  ID     ************************
 *****************************************************************/
exports.readPost = (req, res, next) => {
  post.findById(req.params.id) // Find the post in database
    .then((post) => {
      post.imageUrl = `${req.protocol}://${req.get("host")}${post.imageUrl}`; // Add image URL
      res.status(200).json(hateoasLinks(req, post, post._id)); // Request ok
    })
    .catch(
      (error) => res.status(404).json({ error }) // Error not found
    );
};

/*****************************************************************
 *****************      READ ALL  POST           *****************
 *****************************************************************/
exports.readAllPosts = (req, res, next) => {
  Sauce.find()
    .then((posts) => {
      posts = posts.map((post) => {
        post.imageUrl = `${req.protocol}://${req.get("host")}${
          post.imageUrl
        }`; // Add image URL
        return hateoasLinks(req, post, post._id);
      });
      res.status(200).json(posts); // Request ok
    })
    .catch(
      (error) => res.status(400).json({ error }) // Error not found
    );
};

/*****************************************************************
 *****************    CREATE NEW POST       **********************
 *****************************************************************/
exports.createPost = (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({
      message: "Image not found",
    });
  }
  if (!req.body.post) {
    return res.status(422).json({
      message: "Post not found !",
    });
  }
  // Creation new model post
  const postObject = JSON.parse(req.body.post); // Get the post object
  delete postObject._id; // Delete the id
  delete postObject.userId;
  const post = new Post({
    ...postObject, // Add the post object
    userId: req.auth.userId,
    imageUrl: `/images/${req.file.filename}`,
  });
  // Create new post
  post
    .save()
    .then((newPost) => {
      res.status(201).json(hateoasLinks(req, newPost, newPost._id));
    }) // Request ok  post created
    .catch(
      (error) => res.status(400).json({ error }) // Error bad request
    );
};

/*****************************************************************
 *****************  MODIFY ELEMENT IN  A POST    *****************
 *****************************************************************/
exports.updatePost = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post.userId !== req.auth.userId) {
      res.status(403).json({
        message: "Unauthorized request!", // If the user is not the creator => unauthorized message
      });
    } else {
      const postObject = req.file
        ? {
            ...JSON.parse(req.body.post),
            imageUrl: `/images/${req.file.filename}`,
          }
        : { ...req.body };
      const filename = post.imageUrl.split("/images/")[1];
      try {
        if (postObject.imageUrl) {
          fs.unlinkSync(`images/${filename}`); //Delete old image
        }
      } catch (error) {
        console.log(error);
      }
      Post.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          ...postObject,
          _id: req.params.id,
        },
        {
          new: true,
        }
      )
        .then((updatePost) => {
          res.status(200).json(hateoasLinks(req, updatePost, updatePost._id));
        }) // Request ok
        .catch((error) => res.status(400).json({ error })); // Error bad request
    }
  });
};

/*****************************************************************
 *****************     DELETE THE POST          ******************
 *****************************************************************/
exports.deletePost = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // Find sauce
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        return res.status(403).json({ message: "non-authorization !" }); // If the user is not the creator => unauthorized message
      }
      const filename = post.imageUrl.split("/images/")[1];
      // Delete
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(204).send()) // No content
          .catch((error) => res.status(400).json({ error })); // Error bad request
      });
    });
};

/*****************************************************************
 *****************  LIKE OR DISLIKE A POST     *******************
 *****************************************************************/
exports.likePost = (req, res, next) => {
  Sauce.findById(req.params.id)
    .then((postFound) => {
      const userId = req.auth.userId;
      const usersLikedExists = postFound.usersLiked.includes(userId);
      const usersDislikedExists = postFound.usersDisliked.includes(userId);
      let toChange = {};
      switch (req.body.like) {
        case -1:
          toChange = {
            $inc: { dislikes: 1 }, // Add a dislike
            $push: { usersDisliked: userId }, // Add the user to the list of users disliked
          };
          if (usersLikedExists) {
            toChange = {
              $inc: { dislikes: 1, likes: -1 }, // Add a dislike and remove a like
              $push: { usersDisliked: userId },
              $pull: { usersLiked: userId },
            };
          }
          if (!usersDislikedExists) {
            Sauce.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              toChange,
              {
                new: true,
              }
            )
              .then((postUpdate) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdate, postUpdate._id));
              }) // Request ok
              .catch((error) => res.status(400).json({ error })); // Error bad request
          } else {
            res
              .status(200)
              .json({ message: "User has already disliked the post" });
          }
          break;
        case 0:
          if (usersLikedExists && usersDislikedExists) {
            Sauce.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              {
                $inc: { dislikes: -1, likes: -1 },
                $pull: { usersLiked: userId, usersDisliked: userId },
              },

              {
                new: true,
              }
            )
              .then((postUpdate) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdate, postUpdate._id));
              }) // Request ok
              .catch((error) => res.status(400).json({ error })); // Error bad request
          } else if (usersLikedExists) {
            Sauce.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              (toChange = {
                $inc: { likes: -1 }, // Remove a like
                $pull: { usersLiked: userId }, // Remove the user from the list of users liked
              }),
              {
                new: true,
              }
            )
              .then((postUpdate) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdate, postUpdate._id));
              }) // Request ok
              .catch((error) => res.status(400).json({ error })); // Error bad request
          } else if (usersDislikedExists) {
            Sauce.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              (toChange = {
                $inc: { dislikes: -1 }, // Remove a dislike
                $pull: { usersDisliked: userId }, // Remove the user from the list of users disliked
              }),
              {
                new: true,
              }
            )
              .then((postUpdate) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdate, postUpdate._id));
              }) // Request ok
              .catch((error) => res.status(400).json({ error })); // Error bad request
          } else {
            res.status(200).json({ message: "User's vote is already reset" });
          }
          break;
        case 1:
          toChange = {
            $inc: { likes: 1 },
            $push: { usersLiked: userId },
          };
          if (usersDislikedExists) {
            toChange = {
              $inc: { dislikes: -1, likes: 1 }, // Add a dislike and remove a like
              $pull: { usersDisliked: userId },
              $push: { usersLiked: userId },
            };
          }
          if (!usersLikedExists) {
            Sauce.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              toChange,
              {
                new: true,
              }
            )
              .then((postUpdated) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdated, postUpdated._id));
              }) // Request ok
              .catch((error) => res.status(400).json({ error })); // Error bad request
          } else {
            res
              .status(200)
              .json({ message: "User has already liked the post" });
          }
          break;
      }
    })
    .catch((error) => res.status(404).json({ error })); // Error not found
};

/*****************************************************************
 *****************     HATEOAS FOR POST      *********************
 *****************************************************************/
const hateoasLinks = (req, sauce,id) => {
  const URI = `${req.protocol}://${req.get("host") + "/api/sauces/"}`;
  const hateoas = [
    {
      rel: "readSingle",
      title: "ReadSingle",
      href: URI + id,
      method: "GET",
    },
    {
      rel: "readAll",
      title: "readAll",
      href: URI,
      method: "GET",
    },
    {
      rel: "create",
      title: "Create",
      href: URI,
      method: "POST",
    },
    {
      rel: "likeOrDislike",
      title: "likeOrDislike",
      href: URI + id + "/like",
      method: "POST",
    },
    {
      rel: "update",
      title: "update",
      href: URI + id,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "delete",
      href: URI + id,
      method: "DELETE",
    },
  ];
  return {
    ...post.toObject(),
    links: hateoas,
  };
};
