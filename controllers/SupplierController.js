const m$supplier = require('../modules/supplier.module')

const { Router } = require('express')
const response = require('../helpers/response')

const supplierController = Router()
// http://localhost:8080/api/supplier
supplierController.post('/', async (req, res) => {
    const data = await m$supplier.createSupplier(req.body)
    response.sendResponse(res, data)
})

module.exports = supplierController