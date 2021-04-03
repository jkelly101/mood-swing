// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the user page
    if (req.user) {
      res.redirect("/user");
    }
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("login");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the userpage
    if (req.user) {
      res.redirect("/user");
    }
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the userpage
    if (req.user) {
      res.redirect("/user");
    }
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/user", isAuthenticated, function (req, res) {
    //res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("user");
  });

  app.get("/happy", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.render("happy");
    }
  });

  app.get("/angry", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.render("angry");
    }
  });

  app.get("/sad", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.render("sad");
    }
  });

  app.get("/romantic", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.render("romantic");
    }
  });

  app.get("/crazy", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.render("crazy");
    }
  });
};
