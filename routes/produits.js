//importation du module express 
const express = require('express');
const router  = express.Router();
const auth = require('../middleware/auth');
const multer =require('../middleware/multer');
const produitsCtrl = require('../controllers/produits');


//route pour inserer produit
router.post('/',auth, multer, produitsCtrl.createProduits);

//route pour afficher tous les produits
router.get('/', auth, produitsCtrl.readAllProduits);

//route pour selectionner un produit
router.get('/:id',auth, produitsCtrl.readOneProduits);

//route pour modifier un produit
router.put('/:id',auth,multer, produitsCtrl.modifyProduits);

//route pour supprimer un produit
router.delete('/:id',auth,multer, produitsCtrl.deleteProduits);


//exportation de router produits dans app
module.exports = router;