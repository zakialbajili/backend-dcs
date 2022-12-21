const m$deliv = require('../modules/delivery.module')

const { Router } = require('express')
const response = require('../helpers/response')
const userSession =require('../middleware/auth-middleware')
const delivController = Router()
delivController.get('/', userSession, async (req, res) => {
   const data = await m$deliv.listfiledeliv()
    response.sendResponse(res, data)
})
delivController.get('/:id', userSession, async (req, res) => {
    const data = await m$deliv.listdeliv({id:Number(req.params.id)})
     response.sendResponse(res, data)
 })
delivController.get('/:id', userSession, async (req, res) => {
    const data = await m$deliv.listdelivbysup({id:Number(req.params.id),supplier:req.body.supplier})
     response.sendResponse(res, data)
 })

module.exports = delivController
