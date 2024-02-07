const express = require('express');
const router = express.Router();
const injections = require("../libs/inputValidation/sqlInjection");
const Comunity = require("../libs/Comunity/Comunity");
/**
 * Comunities home route
 * !TODO: Make comunities home page
 * 
 */
router.get('/', (req, res) => {
    res.redirect('/home');
})

/**
 * Route for creating a new community
 */
router.get('/new', async (req, res) => {
    if (!req.session.user || !req.session.user.isAuthenticated) {
        res.render('./comunity/new.ejs', {
            user: req.session.user
        });
    } else {
        res.redirect('/home');
    }
})

router.post('/new', async (req, res) => {
    if (!req.session.user || !req.session.user.isAuthenticated) {
        res.redirect('/home');
    }
    const ComunityData = {
        owner: req.session.user.id,
        name: req.body.name,
        description: req.body.description,
    }
    console.log(ComunityData);
    const com = await new Comunity();
    if (await com.createNewComunity(ComunityData.name, ComunityData.owner)){
        res.redirect('/comunity/' + com.getName());
    }
})

router.get('/:name', async (req, res) => {
    const com = new Comunity();
    if (!com.exists(req.params.name)) {
        res.redirect('/home');
        return;
    }
    await com.loadComunityData(req.params.name);
    const comunityData = com.getComunityData();
    res.render('comunity/comunity.ejs', {
        user: req.session.user || {
            isAuthenticated: false
        },
        comunity: comunityData
    })
    return;
})

router.get('/edit/:name/', async (req, res) => {
    const com = new Comunity();
    if (!com.exists(req.params.name)) {
        res.redirect('/home');
        return;
    }
    await com.loadComunityData(req.params.name);
    const comunityData = com.getComunityData();
    res.render('comunity/edit.ejs', {
        user: req.session.user || {
            isAuthenticated: false
        },
        comunity: comunityData
    })
    return;
})
router.post('/edit/:name/description', async (req, res) => {
    if (
        !req.session.user ||
        !com.exists(comunityName)
        ){
        res.redirect('/home');
        return;
    }
    let comunityName = req.params.name;
    const com = new Comunity();
    await com.loadComunityData(comunityName);
    if (req.session.user.id !== com.getAdmin()) {
        console.log("admin");
        res.redirect('/home');
        return;
    }
    if(!injections(req.body.description)){
        await com.setDescription(req.body.description);
        res.redirect('/comunity/' + comunityName);
    }
    res.redirect('/comunity/' + comunityName);
})

router.post('/edit/:name/name', async (req, res) => {
    if (
       !req.session.user ||
       !com.exists(comunityName)
        ) {
        res.redirect('/home');
        return;
    }
    let comunityName = req.params.name;
    const com = new Comunity();
    await com.loadComunityData(comunityName);
    if (req.session.user.id!== com.getAdmin()) {
        res.redirect('/home');
        return;
    }
    if(!injections(req.body.name)){
        await com.setName(req.body.name);
        res.redirect('/comunity/' + comunityName);
    }
    res.redirect('/comunity/' + comunityName);
})

router.post('/edit/:name/admin', async (req, res) => {
    if (
        !req.session.user ||
        !com.exists(comunityName)
    ) {
        res.redirect('/home');
        return;
    }
    let comunityName = req.params.name;
    const com = new Comunity();
    await com.loadComunityData(comunityName);
    if (req.session.user.id!== com.getAdmin()) {
        res.redirect('/home');
        return;
    }
    if(!injections(req.body.name)){
        await com.setAdmin(req.body.name);
        res.redirect('/comunity/' + comunityName);
    }
    res.redirect('/comunity/' + comunityName);
})

module.exports = router;