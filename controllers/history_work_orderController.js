const m$hwo = require('../modules/history_work_order.module')

const { Router } = require('express')
const response = require('../helpers/response')

const hwoController = Router()
const multer = require('multer')
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload= multer({storage: multerDiskStorage})


hwoController.post('/',upload.single('name_file'), async (req, res) => {
    const data = await m$hwo.createhwo(req.file)

    response.sendResponse(res, data)
})


module.exports = hwoController