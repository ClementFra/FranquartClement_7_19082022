const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

/*****************************************************************
 *****************       READ ONE COMMENT       ******************
 *****************************************************************/

exports.readOneComment = (req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (req.body.imageUrl) {
        comment.imageUrl = `${req.protocol}://${req.get("host")}${
          comment.imageUrl
        }`;
      }
      res.status(200).json(comment, hateoasLinks(req, comment._id));
    })
    .catch((error) => res.status(404).json(error));
};

/*****************************************************************
 *****************       READ ALL COMMENT       ******************
 *****************************************************************/
exports.readAllComments = (req, res, next) => {
  Comment.find({
    postId: req.body.postId,
  })
    .then((onePostComments) => res.status(200).json(onePostComments))
    .catch((error) => res.status(404).json(error));
};

/*****************************************************************
 *****************       CREATE NEW COMMENT      *****************
 *****************************************************************/

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    userId: req.auth.userId,
    message: req.body.message,
    postId: req.body.postId,
  });
  comment
    .save()
    .then((newComment) => {
      Post.findByIdAndUpdate(
        newComment.postId,
        {
          $push: {
            comments: newComment._id,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
        .then(() =>
          res.status(201).json(newComment, hateoasLinks(req, newComment._id))
        )
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

/*****************************************************************
 *****************         LIKE COMMENT     **********************
 *****************************************************************/

exports.likeComment = (req, res, next) => {
  Comment.findById(req.params.id)
    .then((commentFound) => {
      switch (req.body.like) {
        case 1:
          if (!commentFound.usersLiked.includes(req.auth.userId)) {
            Comment.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              {
                $inc: {
                  likes: 1,
                },
                $push: {
                  usersLiked: req.auth.userId,
                },
              },
              {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
              }
            )
              .then((commentUpdated) =>
                res
                  .status(200)
                  .json(commentUpdated, hateoasLinks(req, commentUpdated._id))
              )
              .catch((error) =>
                res.status(400).json({
                  error,
                })
              );
          } else {
            res.status(200).json({
              message: "User has already liked this comment",
            });
          }
          break;
        case 0:
          if (commentFound.usersLiked.includes(req.auth.userId)) {
            Comment.findByIdAndUpdate(
              {
                _id: req.params.id,
              },
              {
                $inc: {
                  likes: -1,
                },
                $pull: {
                  usersLiked: req.auth.userId,
                },
              },
              {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
              }
            )
              .then((commentUpdated) =>
                res
                  .status(200)
                  .json(commentUpdated, hateoasLinks(req, commentUpdated._id))
              )
              .catch((error) =>
                res.status(400).json({
                  error,
                })
              );
          } else {
            res.status(200).json({
              message: "User's like is already reset",
            });
          }
          break;
      }
    })
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

/*****************************************************************
 *****************       UPDATE COMMENT       ********************
 *****************************************************************/
exports.updateComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: "No such comment !",
      });
    }
    if (comment.userId !== req.auth.userId) {
      return res.status(403).json({
        error: "Unauthorized request!",
      });
    }
    Comment.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .then((commentUpdated) =>
        res
          .status(200)
          .json(commentUpdated, hateoasLinks(req, commentUpdated._id))
      )
      .catch((error) => res.status(400).json(error));
  });
};

/*****************************************************************
 *****************       DELETE COMMENT       ********************
 *****************************************************************/
exports.deleteComment = (req, res, next) => {
  Post.findOne({
    comments: req.params.id,
  })
    .then((postFound) => {
      if (!postFound) {
        return res.status(404).json({
          error: "No such post !",
        });
      }
      Post.findOneAndUpdate(
        { _id: postFound._id },
        {
          $pull: {
            comments: req.params.id,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
        .then(() => {
          Comment.findByIdAndDelete(req.params.id)
            .then((comment) => {
              if (!comment) {
                return res.status(404).json({
                  error: "No such comment !",
                });
              }
              if (comment.userId !== req.auth.userId) {
                return res.status(403).json({
                  error: "Unauthorized request!",
                });
              }
              res.sendStatus(204);
            })
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

/*****************************************************************
 *****************       HATEOAS FOR COMMENT     *****************
 *****************************************************************/
const hateoasLinks = (req, id) => {
  const URI = `${req.protocol}://${req.get("host") + "/api/comments/"}`;
  return [
    {
      rel: "readOne",
      title: "ReadOne",
      href: URI + id,
      method: "GET",
    },
    {
      rel: "readAll",
      title: "ReadAll",
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
      rel: "like",
      title: "Like",
      href: URI + id + "/like",
      method: "POST",
    },
    {
      rel: "update",
      title: "Update",
      href: URI + id,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "Delete",
      href: URI + id,
      method: "DELETE",
    },
    {
      rel: "report",
      title: "Report",
      href: URI + id + "/report",
      method: "POST",
    },
  ];
};
