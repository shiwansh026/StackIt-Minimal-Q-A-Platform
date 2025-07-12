const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

let connection;

try {
  connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

  connection.connect(error => {
    if (error) {
      console.log("⚠️  Database connection failed (this is normal for free tier deployments)");
      console.log("   Database features will be disabled");
    } else {
      console.log("✅ Successfully connected to the MySQL database.");
    }
  });
} catch (error) {
  console.log("⚠️  Database module not available (free tier mode)");
  console.log("   Database features will be disabled");
}

module.exports = connection;
