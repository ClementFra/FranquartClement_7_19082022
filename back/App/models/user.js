const mongoose = require(`mongoose`);
const uniqueValidator = require(`mongoose-unique-validator`);

// Setting schema for a user
const userSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    userName: {type: String,required: true,unique: true,minlength: 3,maxlength: 50,trim: true},
    followers: [{type: String,default: 0,ref: "User"}],
    following: [{type: String,default: 0,ref: "User"}]
},{
    timestamps: true
});

// Check for duplicate database entries, if user have the same email adress before register
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);