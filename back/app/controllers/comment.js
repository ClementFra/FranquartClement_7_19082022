const Post = require("../models/post");
const Comment = require("../models/comment");

/*****************************************************************
 *****************       CREATE NEW COMMENT      *****************
 *****************************************************************/

exports.createComment = (req, res, next) => {
  Post
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post don't exist" });
      }
    })
    .then((newComments) => {
      const newComment = {
        userId: req.auth.userId,
        message: req.body.message,
        postId: req.post.postId,
      };
      return Post.findByIdAndUpdate(
        newComment.postId,
        {
          $push: {
            comments:{
              message: newComments
            }
          },
        },
        {new: true,upsert: true,setDefaultsOnInsert: true}
      )
      .then(() => res.status(201).json(hateoasLinks(req, newComment)));
    })
    .catch((error) => res.status(400).json(error));
};

/*****************************************************************
 *****************       UPDATE COMMENT       ********************
 *****************************************************************/
exports.updateComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: "No comment !",
      });
    }
    if (post.userId !== req.auth.userId && !req.auth.isAdmin) {
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
        res.status(200).json(hateoasLinks(req, commentUpdated))
      )
      .catch((error) => res.status(400).json(error));
  });
};

/*****************************************************************
 *****************       DELETE COMMENT       ********************
 *****************************************************************/
exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete({ _id: req.params.id }).then((comment) => {
    if (comment.userId !== req.auth.userId && !req.auth.isAdmin) {
      res.status(403).json({ message: "Unauthorized" });
    }
    Post.findOneAndUpdate(
      { comments: req.params.id },
      { $pull: { comments: req.params.id } },
      { new: true, setDefaultsOnInsert: true, updert: true }
    )
      .then(() => {
        return res.status(204).json();
      })
      .catch((error) => res.status(400).json(error));
  });
};

/*****************************************************************
 *****************       HATEOAS FOR COMMENT     *****************
 *****************************************************************/
const hateoasLinks = (req, comment) => {
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
      href: URI + comment._id,
      method: "PUT",
    },
    {
      rel: "delete",
      title: "Delete",
      href: URI + comment._id,
      method: "DELETE",
    },
  ];
  return {
    ...comment.toObject(),
    links: hateoas,
  };
};
