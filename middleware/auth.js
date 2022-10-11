//importation du module jsonwebtoken
const jwt = require('jsonwebtoken');

//configuration de authentification
module.exports = (req, res, next) => {
    try{
      //recuperation du token d'utlisateur
    const token = req.headers.authorization.split(' ')[1];

    //decodage du token d'utilisateur
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
        userId : userId
    };
    //comparaison des token
   
    
 next(); 
    }catch(error){
        res.status(401).json({error})
    }
   
}