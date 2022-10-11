//importation du module multer
const multer = require('multer');

//configuration de l'extention ou format de l'images
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpp',
    'image/png':'png'
}

//configuration du disk de stockage
const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'images')
    },
    filename:(req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage : storage}).single('image');