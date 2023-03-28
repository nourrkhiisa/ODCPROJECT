const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize("odcusers", "root", "M9o3Ta60B;@?", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
