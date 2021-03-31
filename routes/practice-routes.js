// get shoots back a message
// submit form using post
// delete (such as from a post list) use app.delete
// patch updates a post

// Middlewares in express is a function that executes when routes are being hit
module.exports = (app) => {
  app.get("/mood2/:mood", (req, res) => {
    // send something back
    let mood = req.params.mood;
    // do not specify handlebars.. it knows from server.js
    res.render("mood2", { mood: mood });
  });
};
