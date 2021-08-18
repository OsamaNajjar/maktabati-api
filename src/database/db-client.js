const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME
  , process.env.DB_USER
  , process.env.DB_PASSWORD
  , {
        host: process.env.DB_SERVER
      , dialect: process.env.DB_DIALECT
      , dialectOptions: {
          options: { 
              instanceName: process.env.DB_INSTANCE_NAME,
              trustServerCertificate: true,
              encrypt:false
          }
      }
      , timezone: '+03:00'
      , pool: {
          max: 5,
          min: 0,
          idle: 10000
      }
  });

  module.exports = sequelize;