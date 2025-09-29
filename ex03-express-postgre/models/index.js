import { Sequelize, DataTypes } from "sequelize";
import getUserModel from "./user.js"; 
import getMessageModel from "./message.js";

import pg from 'pg'; 

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg, 
});

const db = {};

db.User = getUserModel(sequelize, DataTypes);
db.Message = getMessageModel(sequelize, DataTypes);

db.User.hasMany(db.Message, {
  onDelete: 'CASCADE', 
  foreignKey: 'userId', 
  as: 'messages'
});

db.Message.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user'
});

Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db); 
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db; 