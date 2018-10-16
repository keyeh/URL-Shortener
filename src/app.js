const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 9000,
    longToShort = require("./longToShort");

app.use(bodyParser.urlencoded({ extended: true })); // support HTML form
app.use(bodyParser.json()); // support json also
app.use(express.static("static")); // serve the static folder

// Wrap async functions so express can handle promise rejections
const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
app.post("/api/make_short", asyncMiddleware(longToShort));

app.listen(port, () => console.log(`URL shortener listening on port ${port}!`));
