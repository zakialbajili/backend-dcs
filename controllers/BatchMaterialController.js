const m$batch = require('../modules/batchMaterial.module.js')

const { Router } = require('express')
const response = require('../helpers/response')

const BatchController = Router()

BatchController.get('/', async (req, res) => {
    const list = await m$batch.listBatch()

    response.sendResponse(res, list)
})

BatchController.post('/', async (req, res) => {
    const add = await m$batch.createBatch(req.body);

    response.sendResponse(res, add)
})

BatchController.get('/:id', async (req, res) => {
    const detail = await m$batch.detailBatch(req.params.id)

    response.sendResponse(res, detail)
})

BatchController.put('/:id', async (req, res) => {
    const update = await m$batch.updateBatch(req.body, req.params.id)

    response.sendResponse(res, update)
})

BatchController.delete('/:id', async (req, res) => {
    const destroy = await m$batch.destroyBatch(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = BatchController