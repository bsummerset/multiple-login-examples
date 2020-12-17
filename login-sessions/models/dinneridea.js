'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DinnerIdea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DinnerIdea.belongsTo(models.User, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      })
    }
        
     
  };
  DinnerIdea.init({
    dinner_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DinnerIdea',
  });
  return DinnerIdea;
};