'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class FormData extends Sequelize.Model {}
  FormData.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATE
    },
    preferences: {
      techPref:
      pizzaToppings: Sequelize.STRING,
      timezone:
    }
  }, { sequelize });

  return Task;
}