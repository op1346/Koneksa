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
    techPref: {
      type: Sequelize.STRING
    },
    pizzaToppings: {
      type: Sequelize.STRING
    },
    timezone: {
      type: Sequelize.STRING
    }
  }, { sequelize });

  return FormData;
}