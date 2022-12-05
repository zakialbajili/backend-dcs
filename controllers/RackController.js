const m$rack = require('../modules/rack.module.js')

const { Router } = require('express')
const response = require('../helpers/response')

const RackController = Router()

RackController.get('/', async (req, res) => {
    const list = await m$rack.listRack()

    response.sendResponse(res, list)
})

RackController.post('/', async (req, res) => {
    const add = await m$rack.createRack(req.body);

    response.sendResponse(res, add)
})

RackController.get('/:id', async (req, res) => {
    const detail = await m$rack.detailRack(req.params.id)

    response.sendResponse(res, detail)
})

RackController.put('/:id', async (req, res) => {
    const update = await m$rack.updateRack(req.body, req.params.id)

    response.sendResponse(res, update)
})

RackController.delete('/:id', async (req, res) => {
    const destroy = await m$rack.destroyRack(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = RackController