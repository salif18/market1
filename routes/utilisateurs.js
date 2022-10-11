//importation du module  express 
const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateurs');

//routes pour creation de compte
router.post('/',utilisateurCtrl.signup);

//route pour se connecter a son compte
router.post('/',utilisateurCtrl.login);


//exportation de router utilisateur dans app
module.exports = router;
