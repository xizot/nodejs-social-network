const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./services/db");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
    res.send("home page");
});

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
    });
});
