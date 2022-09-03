const Post = require("../models/post");
const Comment = require("../models/comment");

/*****************************************************************
 *****************       CREATE NEW COMMENT      *****************
 *****************************************************************/

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    userId: req.auth.userId,
    message: req.body.message,
    postId: req.post.postId,
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
          res.status(201).json(hateoasLinks(req, newComment, newComment._id))
        )
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

/*****************************************************************
 *****************       UPDATE COMMENT       ********************
 *****************************************************************/
exports.updateComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    if (!comment) {
      return res.status(404).json({
        error: "No comment !",
      });
    }
    if (comment.userId !== userId && !isAdmin) {
      return res.status(403).json({
        error: "Unauthorized !",
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
          .json(hateoasLinks(req, commentUpdated))
      )
      .catch((error) => res.status(400).json(error));
  });
};

/*****************************************************************
 *****************       DELETE COMMENT       ********************
 *****************************************************************/
exports.deleteComment = (req, res, next) => {
  Post.findOneAndUpdate(
    { comments: req.params.id },
    { $pull: { comments: req.params.id } },
    { new: true, setDefaultsOnInsert: true, updert: true }
  ).then(() => {
    Comment.findByIdAndDelete({ _id: req.params.id })
      .then((comment) => {
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (comment.userId !== userId && !isAdmin) {
          res.status(403).json({ message: "Unauthorized" });
        }
        return res.status(204).json();
      })
      .catch((error) => res.status(400).json(error));
  });
};

/*****************************************************************
 *****************       HATEOAS FOR COMMENT     *****************
 *****************************************************************/
const hateoasLinks = (req, comment, id) => {
  const URI = `${req.protocol}://${req.get("host") + "/api/comments/"}`;
  const hateoas = [
    {
      rel: "create",
      title: "Create",
      href: URI,
      method: "POST",
    },
    {
      rel: "update",
      title: "Update",
      href: URI + commentUpdated._id,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "Delete",
      href: URI + id,
      method: "DELETE",
    },
  ];
  return {
    ...comment.toObject(),
    links: hateoas,
  };
};
