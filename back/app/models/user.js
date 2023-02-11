const mongoose = require(`mongoose`);
const uniqueValidator = require(`mongoose-unique-validator`);

// Setting schema for a user
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageUrl:{
      type: String,
      allowNull: true,
      defaultValue: "./images/Avatar.png"
    },
    biography:{
      type: String,
      maxlength: 500,
      default:"Vive Groupomania..."
    }
  },
  {
    timestamps: true,
  }
);

// Check for duplicate database entries, if user have the same email adress before register
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
