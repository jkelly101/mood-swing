// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

var axios = require("axios");

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

  app.get("/api/happy", function (req, res) {
    //&key=AIzaSyDBrH_3o-Id-pJFZnDqva4mytUP5e6IsHs
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=happy")
      .then((response) => {
        res.json({
          books: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/angry", function (req, res) {
    //&key=AIzaSyDBrH_3o-Id-pJFZnDqva4mytUP5e6IsHs
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=angry")
      .then((response) => {
        res.json({
          books: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/sad", function (req, res) {
    //&key=AIzaSyDBrH_3o-Id-pJFZnDqva4mytUP5e6IsHs
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=unhappy")
      .then((response) => {
        res.json({
          books: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/romantic", function (req, res) {
    //&key=AIzaSyDBrH_3o-Id-pJFZnDqva4mytUP5e6IsHs
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=love")
      .then((response) => {
        res.json({
          books: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get("/api/movies/:mood", function (req, res) {
    let currentMood = req.params.mood;
    let genre;
    switch (currentMood) {
      case "angry":
        genre = "27";
        break;
      case "happy":
        genre = "35";
        break;
      case "romance":
        genre = "10749";
        break;
      case "sad":
        genre = "18";
      default:
        genre = "12";
    }
    //genre id's
    //https://api.themoviedb.org/3/genre/movie/list?api_key=0617e1b9a854c456b3318ee55d178c39&language=en-US

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0617e1b9a854c456b3318ee55d178c39&language=en-US&with_genres=${genre}`
      )

      // in the consoloe try to log array only
      // try to loop through array up to 5 movies and consoloe those five

      // find the initial path for the movie url (poster path) --> google moviedb poster path
      // base URL for images http://image.tmdb.org/t/p/w185/95S6PinQIvVe4uJAd82a2iGZ0rA.jpg

      // create a div on handlebars to hold movies to append
      // loop through and append movie title and poster (have to create element to hold like img h3 )
      .then((response) => {
        res.json({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
