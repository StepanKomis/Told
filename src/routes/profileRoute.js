const express = require('express');
const router = express.Router();
const Profile = require('../libs/Profile/ProfileData/ProfileData');
router.get('/', (req, res) => {
    res.redirect('/home');
});
router.get('/:name', async (req, res) => {
    const profile = await new Profile(req.params.name);
    profile.initializeProfileData();
    const profileData = await profile.getProfileData();
    res.render('profile.ejs', {
        user: req.session.user || {
            isLoggedIn: false
          },
        profile: profileData
    });
});

router.get('/edit/:name', async (req, res) => {
    res.render('Profile/editProfile.ejs', {});
})

router.get('/:id/edit', async (req, res) => {
    const profile = await new Profile(req.params.name);
    profile.initializeProfileData();
    const profileData = await profile.getProfileData();
    res.render('Profile/editProfile.ejs', {
        user: req.session.user || {
            isLoggedIn: false
          },
        profile: profileData
    });
})

router.post('/edit/:id', async (req, res) => {
    
})

module.exports = router;