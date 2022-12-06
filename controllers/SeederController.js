const m$seeder = require("../modules/seeder.module")

const { Router } = require('express')
const response = require('../helpers/response')

const SeederController = Router()

SeederController.get('/', async (req, res) => {
    const data = await m$seeder.migrateSeeder()

    response.sendResponse(res, data)
})

module.exports = SeederController