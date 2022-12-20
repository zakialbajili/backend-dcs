const { Router } = require('express')
const response = require('../helpers/response')
const m$request = require('../modules/materialRequest.module')
const authorization = require('../middleware/auth-middleware')

const MaterialRequestController = Router()

MaterialRequestController.post('/', authorization, async (req, res) => {
    const list = await m$request.list(req.body)

    response.sendResponse(res, list)
})


MaterialRequestController.post('/download', authorization, async (req, res) => {
    const download = await m$request.download(req.body)

    if (download.status) {
        res.setHeader('Content-Disposition', 'attachment; filename=report-production.xlsx')
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.status(200)
        res.send(download.data)
    } else {
        response.sendResponse(res, download)
    }
})

MaterialRequestController.get('/mobile/:id', async (req, res) => {
    const listrequest = await m$request.listrequest(req.params.id)

    response.sendResponse(res, listrequest)
})

module.exports = MaterialRequestController