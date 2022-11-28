const m$userRole = require('../modules/userRole.module')

const { Router } = require('express')
const response = require('../helpers/response')

const UserRoleController = Router()

UserRoleController.get('/', async (req, res) => {
    const list = await m$userRole.listUserRole()

    response.sendResponse(res, list)
})

UserRoleController.post('/', async (req, res) => {
    const data = await m$userRole.createUserRole(req.body)

    response.sendResponse(res, data)
})

UserRoleController.get('/:id', async (req, res) => {
    const detail = await m$userRole.detailUserRole(req.params.id)

    response.sendResponse(res, detail)
})

UserRoleController.put('/:id', async (req, res) => {
    const update = await m$userRole.updateUserRole(req.body, req.params.id)

    response.sendResponse(res, update)
})

UserRoleController.delete('/:id', async (req, res) => {
    const destroy = await m$userRole.destroyUserRole(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = UserRoleController