const { Router } = require('express')
const response = require('../helpers/response')
const upload = require('../middleware/upload-file')
const m$receive = require('../modules/materialReceive.module')
const authorization = require('../middleware/auth-middleware')

const MaterialReceiveController = Router()

MaterialReceiveController.post('/upload', [upload.single("file"), authorization], async (req, res) => {
    const upload = await m$receive.upload(req)

    response.sendResponse(res, upload)
})

MaterialReceiveController.get('/amount', authorization, async (req, res) => {
    const amount = await m$receive.amount()

    response.sendResponse(res, amount)
})

MaterialReceiveController.get('/', authorization, async (req, res) => {
    const list = await m$receive.getFile()

    response.sendResponse(res, list)
})

MaterialReceiveController.get('/:id', authorization, async (req, res) => {
    const list = await m$receive.getMaterialReceive(req.params.id)

    response.sendResponse(res, list)
})

MaterialReceiveController.put('/:id', authorization, async (req, res) => {
    const update = await m$receive.updateMaterialReceive(req.body, req.params.id)

    response.sendResponse(res, update)
})

MaterialReceiveController.delete('/:id', authorization, async (req, res) => {
    const destroy = await m$receive.destroy(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = MaterialReceiveController