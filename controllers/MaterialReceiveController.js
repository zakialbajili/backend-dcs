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

MaterialReceiveController.get('/download/:m', async (req, res) => {
    const download = await m$receive.download(req)

    response.sendResponse(res, download)
})

module.exports = MaterialReceiveController