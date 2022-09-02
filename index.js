const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());






app.get("/", (req, res) => {
    res.json({
        "message": "Hello World!"
    })
});

app.all("*", (req, res) => {
    res.send("NO route found.");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});