//importation du module mongoose et mongoose-unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//configuration du table utlisateurs
const Table_utilisateurs = mongoose.Schema({
    prenom:{type:String, require:true},
    nom:{type:String, required:true},
    address:{type:String, required:true},
    numero:{type:Number, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});

Table_utilisateurs.plugin(uniqueValidator);
module.exports = mongoose.model('Utilisateurs',Table_utilisateurs);