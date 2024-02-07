const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', async (req, res) => {
  res.render('home.ejs', {
    user: req.session.user || {
      isLoggedIn: false
    }
  });
});

router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

module.exports = router;