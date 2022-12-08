const m$auth = require('../modules/material.module')
const { Router } = require('express')
const response = require('../helpers/response')
const auth = require("../middleware/auth-middleware")

const MaterialController = Router()

// SW.C
MaterialController.get('/in', auth, async (req, res) => {
    const list = await m$auth.listMaterialReceives()

    response.sendResponse(res, list)
})
MaterialController.get('/out', auth, async (req, res) => {
    const list = await m$auth.listMaterialReceives()

    response.sendResponse(res, list)
})

module.exports = MaterialController