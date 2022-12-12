const m$placement = require('../modules/placement.module.js')

const { Router } = require('express')
const response = require('../helpers/response')

const PlacementController = Router()

PlacementController.post('/suggestion', async(req, res) => {
    const suggestion = await m$placement.suggestion(req.body)

    response.sendResponse(res, suggestion)
})

PlacementController.post('/add', async(req, res) => {
    const suggestion = await m$placement.addPlacement(req.body)

    response.sendResponse(res, suggestion)
})

module.exports = PlacementController