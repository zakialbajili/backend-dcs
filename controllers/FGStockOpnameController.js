const m$auth = require('../modules/FGstockOpname.module')
const { Router } = require('express')
const response = require('../helpers/response')
const auth = require("../middleware/auth-middleware")

const FGStockOpnameController = Router()

FGStockOpnameController.get('/detail', auth, async (req, res) => {
    let supplier = req.query.supplier
    let startdate = req.query.startdate
    let enddate = req.query.enddate
    let page = req.query.page ? Number(req.query.page) : req.query.page
    let per_page = req.query.per_page ? Number(req.query.per_page) : req.query.per_page


    const list = await m$auth.listFGstockOpname({ supplier: supplier, startdate: startdate, enddate: enddate, page: page, per_page: per_page})

    response.sendResponse(res, list)
})

// fg in vs out
FGStockOpnameController.get('/inout', auth, async (req, res) => {
    let startdate = req.query.startdate
    let enddate = req.query.enddate

    const list = await m$auth.listFGInOut({startdate: startdate, enddate: enddate})

    response.sendResponse(res, list)
})

// chart stock
FGStockOpnameController.get('/chart', auth, async (req, res) => {
    let date = req.query.date

    const list = await m$auth.listChartStock({date: date})

    response.sendResponse(res, list)
})

module.exports = FGStockOpnameController