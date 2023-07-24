const { Pool } = require("pg");

// require("dotenv").config();

const pool = new Pool({
    user: "hashvapah",
    host: "dpg-civ8m4lgkuvoigcssifg-a.oregon-postgres.render.com",
    database: "accountant",
    password: "k80uBpKyQ3A5owF8B82iP9fXNUqywlse",
    port: 5432,
});

module.exports = pool;