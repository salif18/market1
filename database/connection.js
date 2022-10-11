//importation du module mongoose
const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();
//configuration de la connection 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('Connection a mongoDb reussie'))
.catch(() => console.log('Erreur de connection a MongoDb'));

//exportation de la connection dans app
module.exports = mongoose;