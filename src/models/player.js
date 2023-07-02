'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userid",
      });
      this.belongsTo(models.Game, {
        foreignKey: "gameid",
      });
    }
  }
  Player.init({
    color: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    gameid: DataTypes.INTEGER,
    setup: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};