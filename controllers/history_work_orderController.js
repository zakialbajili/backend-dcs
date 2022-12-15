const m$hwo = require('../modules/history_work_order.module')

const { Router } = require('express')
const response = require('../helpers/response')
const userSession =require('../middleware/auth-middleware')
const uploadFile = require ('../middleware/upload-files')
const hwoController = Router()
hwoController.get('/', userSession, async (req, res) => {
   const data = await m$hwo.gethwo()
    response.sendResponse(res, data)
})
hwoController.get('/list_wo', userSession, async (req, res) => {
    const data = await m$hwo.listwo()
     response.sendResponse(res, data)
 })
 hwoController.put('/update_wo', userSession, async (req, res) => {
    const data = await m$hwo.updatewo({
        id:req.body.id,
        total_order: req.body.total_order
    })
     response.sendResponse(res, data)
 })
hwoController.post('/', userSession, uploadFile.single('file'), async (req, res) => {

    const data = await m$hwo.upload_wo(req.file)

    //console.log(req.file)
    response.sendResponse(res, data)
})
module.exports = hwoController
