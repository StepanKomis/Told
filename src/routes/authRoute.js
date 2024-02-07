const express = require('express');
const router = express.Router();
const Auth = require("../libs/Auth/Auth");
const Authenticator = new Auth();
const User = require("../libs/User/User");

router.get('/register', (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect('/home');
    return;
  }
  res.render('register.ejs', {
    user: req.session.user || {
      isLoggedIn: false
    }
  });
});

router.post('/register', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (await Authenticator.registerUser(username, password)){
    res.redirect('/home');
    return;
  } else {
    res.render('/register', {
      message: "Username is already in use.",
      user: req.session.user || {
        isLoggedIn: false
      }
    });
  }
});


router.get('/login', (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect('/home');
    return;
  }
  res.render('login.ejs', {
    user: req.session.user || {
      isLoggedIn: false
    }
  });
});

router.post('/login', async (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect('/home');
    return;
  }
  const userData = {
    username: req.body.username,
    password: req.body.password
  };

  const userId = await Authenticator.loginUser(userData.username, userData.password);

  if (userId === 0) {
    res.render("login.ejs", { message: "Wrong credentials." });
    return;
  }
  const user = await new User(userId);
  user.logIn();
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/home");
    }
  });
});
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/home");
    }
  });
});

module.exports = router;
