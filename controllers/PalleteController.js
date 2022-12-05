const m$pallete = require('../modules/pallete.module.js')

const { Router } = require('express')
const response = require('../helpers/response')

const PalleteController = Router()

PalleteController.get('/', async (req, res) => {
    const list = await m$pallete.listRack()

    response.sendResponse(res, list)
})

PalleteController.post('/', async (req, res) => {
    const add = await m$pallete.createRack(req.body);

    response.sendResponse(res, add)
})

PalleteController.get('/:id', async (req, res) => {
    const detail = await m$pallete.detailRack(req.params.id)

    response.sendResponse(res, detail)
})

PalleteController.put('/:id', async (req, res) => {
    const update = await m$pallete.updateRack(req.body, req.params.id)

    response.sendResponse(res, update)
})

PalleteController.delete('/:id', async (req, res) => {
    const destroy = await m$pallete.destroyRack(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = PalleteController