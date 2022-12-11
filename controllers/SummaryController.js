const m$auth = require('../modules/summary.module')
const { Router } = require('express')
const response = require('../helpers/response')
const auth = require("../middleware/auth-middleware")

const SummaryController = Router()

SummaryController.get('/ng/', auth, async (req, res) => {
    let materialId = req.query.materialid
    let month = req.query.month

    const list = await m$auth.listSummaryNG({ materialId: materialId, month: month })

    response.sendResponse(res, list)
})

SummaryController.get('/dpa', auth, async (req, res) => {
    let month = req.query.month

    const list = await m$auth.listSummaryDPA({month: month})

    response.sendResponse(res, list)
})

module.exports = SummaryController