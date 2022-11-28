const m$role = require("../modules/role.module")

const { Router } = require('express')
const response = require('../helpers/response')

const RoleController = Router()

RoleController.get('/', async (req, res) => {
    const list = await m$role.listRole()

    response.sendResponse(res, list)
})

RoleController.post('/', async (req, res) => {
    const add = await m$role.createRole(req.body);

    response.sendResponse(res, add)
})

RoleController.get('/:id', async (req, res) => {
    const detail = await m$role.detailRole(req.params.id)

    response.sendResponse(res, detail)
})

RoleController.put('/:id', async (req, res) => {
    const update = await m$role.updateRole(req.body, req.params.id)

    response.sendResponse(res, update)
})

RoleController.delete('/:id', async (req, res) => {
    const destroy = await m$role.destroyRole(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = RoleController