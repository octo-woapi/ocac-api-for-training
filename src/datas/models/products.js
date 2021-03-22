const { DataTypes } = require("sequelize");
const { database } = require("../../database");

exports.MatchModel = database.define("product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  type: DataTypes.ENUM(['service', 'soin']),
  code_interne: DataTypes.STRING,
  titre: DataTypes.STRING,
  description_courte: DataTypes.STRING,
  description: DataTypes.STRING
});