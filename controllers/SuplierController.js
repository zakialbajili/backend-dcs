const suplier = require('../modules/suplier.module')

const { Router } = require('express')
const response = require('../helpers/response')

const SuplierController = Router()

SuplierController.get('/', async (req, res) => {
    const list = await suplier.listSuplier()

    response.sendResponse(res, list)
})

SuplierController.post('/', async (req, res) => {
    const data = await suplier.createSuplier(req.body)

    response.sendResponse(res, data)
})
SuplierController.put('/:id', async (req, res) => {
    const update = await suplier.updateSuplier(req.body, req.params.id)

    response.sendResponse(res, update)
})

SuplierController.delete('/:id', async (req, res) => {
    const destroy = await suplier.destroySuplier(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = SuplierController