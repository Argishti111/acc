const express = require("express");
const path = require("path")
const app = express();

app.use(express.json());

app.use("/", require("./service"));

app.use("/", express.static(path.join(__dirname, 'client')))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
});


app.listen(8000)