const m$wod = require('../modules/work_order_detail.module')

const { Router } = require('express')
const response = require('../helpers/response')
const userSession =require('../middleware/auth-middleware')
const wodController = Router()
wodController.get('/', userSession, async (req, res) => {
   const data = await m$wod.listwodetail()
    response.sendResponse(res, data)
})

wodController.get('/:id', userSession, async (req, res) => {
    const data = await m$wod.listwobyid(req.params.id)
     response.sendResponse(res, data)
 })

module.exports = wodController
