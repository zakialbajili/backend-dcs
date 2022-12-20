const { Router } = require('express')
const response = require('../helpers/response')
const upload = require('../middleware/upload-file')
const m$receive = require('../modules/materialReceive.module')
const authorization = require('../middleware/auth-middleware')

const MaterialReceiveController = Router()

MaterialReceiveController.post('/upload', [authorization, upload.single("file")], async (req, res) => {
    const upload = await m$receive.upload(req)

    response.sendResponse(res, upload)
})

MaterialReceiveController.get('/dashboard', authorization, async (req, res) => {
    const dashboard = await m$receive.dashboard(req.body)

    response.sendResponse(res, dashboard)
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