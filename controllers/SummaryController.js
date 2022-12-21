const m$summary = require('../modules/summary.module')
const { Router } = require('express')
const response = require('../helpers/response')
const auth = require("../middleware/auth-middleware")

const SummaryController = Router()

SummaryController.get('/ng/', auth, async (req, res) => {
    let partId = req.query.partid;
    let month = req.query.month;

    const list = await m$summary.listSummaryNG({ partId: partId, month: month });

    response.sendResponse(res, list);
});

SummaryController.get('/ng/date/:tanggal', auth, async (req, res) => {
    let tanggal = req.params.tanggal;
    let enddate = req.query.enddate;

    const list = await m$summary.listSummaryNGDate({tanggal: tanggal, enddate: enddate});

    response.sendResponse(res, list);
})

SummaryController.get('/dpa', auth, async (req, res) => {
    let month = req.query.month;

    const list = await m$summary.listSummaryDPA({month: month});

    response.sendResponse(res, list);
});

// Week yang lengkap 50
SummaryController.get('/dpa/week/:week', auth, async (req, res) => {
    let week = req.params.week;

    const list  = await m$summary.listSummaryDPAWeek({week: week});

    response.sendResponse(res, list);
});

SummaryController.get('/dpa/date/:tanggal', auth, async (req, res) => {
    let tanggal = req.params.tanggal;
    let enddate = req.query.enddate;

    const list = await m$summary.listSummaryDPADate({tanggal: tanggal, enddate: enddate});

    response.sendResponse(res, list);
})

module.exports = SummaryController;