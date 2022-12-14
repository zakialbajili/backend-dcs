const m$auth = require('../modules/materialStock.module');
const { Router } = require('express');
const response = require('../helpers/response');
const auth = require('../middleware/auth-middleware');

const MaterialStockController = Router();

MaterialStockController.get('/minmax', auth, async (req, res) => {
  let supplierId = req.query.supplierId;

  const list = await m$auth.listMaterialStock({ supplierId: supplierId });

  response.sendResponse(res, list);
});

// SW.C
MaterialStockController.get('/in_out', auth, async (req, res) => {
  let month = req.query.month;

  const list = await m$auth.listMaterialInOut({ month: month });

  response.sendResponse(res, list);
});

module.exports = MaterialStockController;
