const m$deliv = require('../modules/Delivery.module')

const { Router } = require('express')
const response = require('../helpers/response')
const userSession =require('../middleware/auth-middleware')
const delivController = Router()
delivController.get('/:id', userSession, async (req, res) => {
   const data = await m$deliv.listdelivbysup(req.params.id)
    response.sendResponse(res, data)
})

module.exports = delivController