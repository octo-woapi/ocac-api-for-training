const Sequelize = require("sequelize");

exports.initDatabase = (storage) => {
  return new Sequelize("db", "user", "pass", {
    host: "localhost",
    dialect: "sqlite",
    storage: storage,
    raw: true,
  });
};

exports.database = this.initDatabase(process.env.DB_NAME || "db.sqlite.local");
