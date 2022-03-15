const { Sequelize, DataTypes } = require("sequelize");

const config = require("../config/config");

// Set database credentials
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

// Test Database
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch(() => {
    console.log("DB Connection Fail");
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model route
db.location = require("./Location")(sequelize, DataTypes);

// DB Sync and create Stored Procedure
db.sequelize
  .sync({
    force: false,
  })
  .then(() => {
      console.log("DB Sync Success")
    })
    .catch((err) => {
        console.log("DB Sync Fail")
    });




module.exports = db;