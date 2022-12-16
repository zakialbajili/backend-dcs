const multer = require('multer')

const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;