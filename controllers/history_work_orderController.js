const m$hwo = require('../modules/history_work_order.module')

const { Router } = require('express')
const response = require('../helpers/response')
const uploadFile = require ('../middleware/upload-files')
const hwoController = Router()
hwoController.get('/', async (req, res) => {
   const data = await m$hwo.listwo()
    response.sendResponse(res, data)
})

hwoController.post('/', uploadFile.single('file'), async (req, res) => {

    const data = await m$hwo.upload_wo(req.file)
    response.sendResponse(res, data)
})
module.exports = hwoController
