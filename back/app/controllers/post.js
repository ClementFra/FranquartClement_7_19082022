// Import the post model
const Post = require("../models/post");
const Comment = require("../models/comment");
// File system
const fs = require("fs");

/*****************************************************************
 *****************  READ POST BY  ID     ************************
 *****************************************************************/
exports.readPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.body.imageUrl) {
        post.imageUrl = `${req.protocol}://${req.get("host")}${post.imageUrl}`;
      }
      if (req.body.comments) {
        Comment.find({ postId: req.body.postId })
          .then(() => {
            res.status(200).json();
          })
          .catch((error) =>
            res.status(400).json({
              error: error,
            })
          );
      }

      res.status(200).json(hateoasLinks(req, post));
    })
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

/*****************************************************************
 *****************      READ ALL  POST           *****************
 *****************************************************************/
exports.readAllPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      posts = posts.map((post) => {
        post.imageUrl = `${req.protocol}://${req.get("host")}${post.imageUrl}`; // Add image URL
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
  // Creation new model post
  const postObject = JSON.parse(req.body.post); // Get the post object
  delete postObject._id; // Delete the id
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
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    if (post.userId !== userId && !isAdmin) {
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
          res.status(200).json(hateoasLinks(req, updatePost));
        }) // Request ok
        .catch((error) => res.status(400).json({ error })); // Error bad request
    }
  });
};

/*****************************************************************
 *****************     DELETE THE POST          ******************
 *****************************************************************/
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) // Find post
    .then((post) => {
      const userId = decodedToken.userId;
      const isAdmin = decodedToken.isAdmin;
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ message: "Unthorized !" }); // If the user is not the creator => unauthorized message
      }
      const filename = post.imageUrl.split("/images/")[1];
      // Delete
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
        .then(()=>{
          Comment.deleteMany({ postId: req.params.id })
          .then(() => res.status(204).send()) // No content
          .catch((error) => res.status(400).json({ error })); // Error bad request
        })
        .catch((error) => res.status(400).json({ error })); 
      });
    });
};

/*****************************************************************
 *****************  LIKE OR DISLIKE A POST     *******************
 *****************************************************************/
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const userLikedPost = post.usersLiked.includes(req.auth.userId);
      let toChange = {};
      switch (req.body.likes) {
        case 1:
          toChange = {
            $inc: { likes: 1 },
            $push: { usersLiked: req.auth.userId },
          };

          if (!userLikedPost) {
            Post.findByIdAndUpdate({ _id: req.params.id }, toChange, {
              new: true,
              setDefaultsOnInsert: true,
              upsert: true,
            })
              .then((postUpdated) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdated));
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            res
              .status(200)
              .json({ message: "You have already like this post" });
          }
          break;
        case 0:
          toChange = {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.auth.userId },
          };
          if (userLikedPost) {
            Post.findByIdAndUpdate({ _id: req.params.id }, toChange, {
              new: true,
              setDefaultsOnInsert: true,
              upsert: true,
            })
              .then((postUpdated) => {
                res
                  .status(200)
                  .json(hateoasLinks(req, postUpdated));
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            res
              .status(200)
              .json({ message: " User don't have like this post" });
          }
          break;
        default:
          res.status(422).json({ message: "Invalid value for like" });
      }
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/*****************************************************************
 *****************     HATEOAS FOR POST      *********************
 *****************************************************************/
const hateoasLinks = (req, post, id) => {
  const URI = `${req.protocol}://${req.get("host") + "/api/posts/"}`;
  const hateoas = [
    {
      rel: "readSingle",
      title: "ReadSingle",
      href: URI + post._id,
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
      rel: "likePost",
      title: "likePost",
      href: URI + postUpdated._id + "/like",
      method: "POST",
    },
    {
      rel: "update",
      title: "update",
      href: URI + updatePost._id,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "delete",
      href: URI + post.id,
      method: "DELETE",
    },
  ];
  return {
    ...post.toObject(),
    links: hateoas,
  };
};
