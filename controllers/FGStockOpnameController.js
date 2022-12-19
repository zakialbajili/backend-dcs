const m$auth = require('../modules/FGstockOpname.module');
const { Router } = require('express');
const response = require('../helpers/response');
const auth = require('../middleware/auth-middleware');

const FGStockOpnameController = Router();

FGStockOpnameController.get('/detail', auth, async (req, res) => {
  let supplierId = req.query.supplierId;
  let month = req.query.month;

  const list = await m$auth.listFGstockOpname({ supplierId: supplierId, month: month });

  response.sendResponse(res, list);
});

// SW.C
FGStockOpnameController.get('/inout', auth, async (req, res) => {
  let month = req.query.month;

  const list = await m$auth.listFGInOut({ month: month });

  response.sendResponse(res, list);
});
FGStockOpnameController.get('/chart', auth, async (req, res) => {
  let month = req.query.month;

  const list = await m$auth.listChartStock({ month: month });

  response.sendResponse(res, list);
});

module.exports = FGStockOpnameController;
