const express = require("express");
const router = express();

router.use("/employee", require("./employee"));

module.exports = router;