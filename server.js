//importation du module http
const http = require('http');
const dotenv = require('dotenv');
const app =require('./app');

//configuration du server---->
 dotenv.config();
app.set(process.env.PORT || 3800);
const server = http.createServer(app);

//mis en marche du server et application
server.listen(process.env.PORT || 3800, () => {
    console.log('Application tourne avec succes sur localhost:3800');
})