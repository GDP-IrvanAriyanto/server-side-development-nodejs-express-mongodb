var express = require("express");
const bodyParser = require("body-parser");
var User = require("../models/users");
var passport = require("passport");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username, password: req.body.password }),
    req.body.password,
    (err, user) => {
      //   User.register(
      //     new User({ username: req.body.username }),
      //     req.body.password,
      //     (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ status: "Registration Successfully", user: user });
        });
      }
    }
  );
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ status: "You are Successfully logged in!", user: user });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
});

module.exports = router;
