
const multer = require('multer')
const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
//const upload= multer({storage: multerDiskStorage})
const uploadFile= multer({storage: multerDiskStorage, fileFilter: excelFilter})
module.exports = uploadFile;