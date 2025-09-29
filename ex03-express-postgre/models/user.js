import { DataTypes } from 'sequelize';

const getUserModel = (sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255], 
      },
    },
  });

  return User;
};

export default getUserModel;