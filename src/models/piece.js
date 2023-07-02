'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Piece extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {
        foreignKey: "gameid",
      })
    }
  }
  Piece.init({
    gameid: DataTypes.INTEGER,
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    position_x: DataTypes.INTEGER,
    position_y: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    movement: DataTypes.INTEGER,
    hidden: DataTypes.BOOLEAN,
    petrified_turns: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Piece',
  });
  return Piece;
};