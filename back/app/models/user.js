module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: Sequelize.STRING(),
        required: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(32),
        required: true,
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        required: true,
        default: false,
      },
      aboutMe: {
        type: Sequelize.STRING,
        maxlength: 1024,
        default: "Vive Groupomania...",
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.refreshToken, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };
  return User;
};
