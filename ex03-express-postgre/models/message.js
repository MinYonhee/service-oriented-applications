import { DataTypes } from 'sequelize';

const getMessageModel = (sequelize) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Message;
};

export default getMessageModel;