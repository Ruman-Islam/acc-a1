const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// ROUTES IMPORT //
const errorHandler = require("./middlewares/errorHandler");
const userInfoRoute = require('./routes/v1/userInfo.route');
// ............... //

// APPLICATION MIDDLEWARE //
app.use(express.json());
app.use(express.static("public"));
// ...................... //



// APPLICATION ROUTES //
app.get("/", (req, res) => res.status(200).send("WELCOME TO USER THE INFO WORLD!"));
app.use('/api/v1/user', userInfoRoute);
// ...................//


// DEFAULT ERROR HANDLERS //
app.use(errorHandler);

app.all("*", (req, res) => {
    res.send("NO ROUTE FOUND.");
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


// https://acc-a1.vercel.app/