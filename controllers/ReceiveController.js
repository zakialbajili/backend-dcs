const { Router } = require('express')
const response = require('../helpers/response')
const upload = require('../middleware/upload')
const m$receive = require('../modules/receive.module')

const ReceiveController = Router()

ReceiveController.post('/upload', upload.single("file"), async (req, res) => {
    const upload = await m$receive.upload(req)

    response.sendResponse(res, upload)
})

ReceiveController.get('/download/:m', async (req, res) => {
    const download = await m$receive.download(req)

    response.sendResponse(res, download)
})

module.exports = ReceiveController