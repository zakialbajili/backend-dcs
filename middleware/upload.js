const multer = require('multer')

const excelFilter = (req, file, cb) => {
    if ( file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml") ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
  
const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;