//importation du module mongoose
const mongoose = require('mongoose');

//configuration du table produits
const Table_produits = mongoose.Schema({
    titre:{type:String, required:true},
    description:{type:String, required:true},
    imageUrl:{type:String, required:true},
    userId:{type:String},
    Prix:{type:Number, required:true},
})

module.exports = mongoose.model('Produits',Table_produits);