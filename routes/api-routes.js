// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

var axios = require('axios');

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });


  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {

      res.json({
        email: req.user.email,
        id: req.user.id,
      });

    }
  });

  const sendGetReq = async (res) => {
    try {
      const resp = await axios.get("https://zenquotes.io/api/today");
      res.json(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  app.get("/api/dailyQuote", function (req, res) {
    sendGetReq(res);
  });

  app.get("/api/happy", function(req, res) {
   
      //&key=AIzaSyDBrH_3o-Id-pJFZnDqva4mytUP5e6IsHs
      axios.get('https://www.googleapis.com/books/v1/volumes?q=motivation')
      
      .then(response => {
        res.json({
          books: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
