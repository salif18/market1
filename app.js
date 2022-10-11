//importation du module express
const express = require('express');
const app = express();
const connection = require('./database/connection');
const utilisateurRouter = require('./routes/utilisateurs');
const produitsRouter = require('./routes/produits');
const path = require('path');
const staticPath = path.join(__dirname,'public');


//-------------Configuration de l'application------------>
//autrisation de lire les donnees rentrant du frontend en json
app.use(express.json());

//autorisation de lire les fichers html css js
app.use(express.static(staticPath));

//autorisation de se connecter aves les differents server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//--------------les Fonctions de L'application------------>

app.get('/home',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','home.html'));
})

app.get('/signup',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','signup.html'));
})

app.get('/login',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','login.html'));
})

app.get('/product',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','product.html'));
})

app.get('/panier',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','panier.html'));
})

app.get('/checkout',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','checkout.html'));
})

app.get('/vendre',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','vendeur.html'));
})

app.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','add-product.html'));
})

app.get('/404',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','404.html'));
})


app.get('/search',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','search.html'));
})


app.get('/mail',(req, res, next) => {
    res.sendFile(path.join(staticPath,'pages','mail.html'));
})


app.use('/produits',produitsRouter);

app.use('/auth',utilisateurRouter);


//-----------exportation de l'application dans le server--->
module.exports = app;