const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../index');

const db = {};

const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password, {
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: config.sequelize.dialect,
    dialectOptions: config.sequelize.dialectOptions,
    pool: {
      max: config.sequelize.pool.max,
      min: config.sequelize.pool.min,
      idle: config.sequelize.pool.idle,
    },
    define: config.sequelize.define,
    logging: config.sequelize.logging || false,
    retry: config.sequelize.retry,
  },
);

const modelsDir = config.sequelize.models;
fs.readdirSync(modelsDir)
  .filter(f => (f.indexOf('.') !== 0) && (f.slice(-3) === '.js'))
  .forEach((f) => {
    const model = sequelize.import(path.join(modelsDir, f));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
