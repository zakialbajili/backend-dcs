const m$hwo = require('../modules/history_work_order.module')

const { Router } = require('express')
const response = require('../helpers/response')
const uploadFile = require ('../middleware/upload-files')
const hwoController = Router()

    hwoController.post('/', uploadFile.single('name_file'), async (req, res) => {
        console.log(req.file)
        const data = await m$hwo.createhwo({
            name_file:req.file.filename,
        })
    
        response.sendResponse(res, data)
    })

    hwoController.get('/', async (req, res) => {
        const data = await m$hwo.gethwo({
        })
    
        response.sendResponse(res, data)
    })

    hwoController.delete('/:id', async (req, res) => {
        const data = await m$hwo.deletehwo(Number(req.params.id))
    
        response.sendResponse(res, data)
    })

    
    
    
    module.exports = hwoController