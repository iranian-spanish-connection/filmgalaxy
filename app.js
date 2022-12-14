// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// Handlebars helper
const H = require("just-handlebars-helpers");
const isLoggedIn = require("./middleware/isLoggedIn");

// Register just-handlebars-helpers with handlebars
H.registerHelpers(hbs);

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "filmgalaxy";

app.locals.appTitle = `${capitalized(projectName)}`;

app.use((req, res, next) => {
  res.locals.userInSession = req.session.user;
  next();
});

// 👇 Start handling routes here
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/festival.routes"));
app.use("/", isLoggedIn, require("./routes/project.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
