const { Pool } = require("pg");

// require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    host: "172.17.0.2",
    database: "Accountant",
    password: "postgres",
    port: 5432,
});

module.exports = pool;