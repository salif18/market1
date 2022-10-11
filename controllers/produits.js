//importation du module fs 
const fs = require('fs');
const Produits = require('../models/table_produits');

// route pour inser des produits dans la base de donnees
exports.createProduits = (req, res, next) => {
   const produitsObject = JSON.parse(req.body.produits);
   delete produitsObject._id;
   delete produitsObject._userId;

    const produits = new Produits({
        ...produits,
        _userId: req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    });
    produits.save()
    .then(() => res.status(201).json({message:'produits ajouter'}))
    .catch((error) => res.status(400).json({error}))
};

//route pour afficher tous les produits
exports.readAllProduits = (req, res, next) => {
    Produits.find()
    .then((produits) => res.status(200).json((produits)))
    .catch((error) => res.status(400).json({error}))
}   

//route pour selectionner un seul produit
exports.readOneProduits = (req, res, next) => {
    Produits.findOne()
    .then((produit) => res.status(200).json(produit))
    .catch((error) => res.status(400).json({error}))
};

//route pour modifier un produit
exports.modifyProduits = (req, res, next) => {
    const produitsObject = req.file ? {
        ...JSON.parse(req.body.produits),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete produitsObject._userId;
    Produits.findOne({_id: req.params.id})
        .then((produit) => {
            if (produit.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autoriser'});
            } else {
                Produits.updateOne({ _id: req.params.id}, { ...produitsObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 //route pour supprimer un produit
 exports.deleteProduits = (req, res, next) => {
    Produits.findOne({ _id: req.params.id})
        .then(produit => {
            if (produit.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autoriser'});
            } else {
                const filename = produit.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Produits.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };