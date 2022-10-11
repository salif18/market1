//importation du module bcrypt , jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateurs = require('../models/table_utilisateurs');

//route pour inscription d'utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const utilisateurs = new Utilisateurs({
            prenom:req.body.prenom,
            nom:req.body.nom,
            address:req.body.address,
            numero:req.body.numero,
            email:req.body.email,
            password:hash,
        });
        utilisateurs.save()
        .then(() => res.status(201).json({
            message:'nouvel utilisateur enregistre'
        }))
        .catch((error) => res.status(500).json({
            message:"echec d'enregistrement d'utilisateur",
            error:error
        }))
    })
    .catch((error)=>res.status(500).json({error}))
};

//route pour l'authentification de connection a son compte
exports.login = (req, res, next) => {
    Utilisateurs.findOne({email:req.body.email})
    .then((user) => {
        if(!user){
            return res.status(400).json({
                message:'Votre email est incorrect'
            })
        };
        bcrypt.compare(req.body.password, Utilisateurs.password)
        .then((valid) => {
            if(!valid){
                return res.status(400).json({
                    message:'votre mot de passe est incorrect'
                })
            } 

            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            
            }); 
           
        })
        .catch((error) => res.status(500).json({
            message:"Echec authentification",
            error :error
        }))

    }).catch((error) => res.status(500).json({
        message:"echec authentification",
        error:error
    }));
}