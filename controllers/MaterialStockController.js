const m$auth = require('../modules/materialStock.module');
const { Router } = require('express');
const response = require('../helpers/response');
const auth = require('../middleware/auth-middleware');

const MaterialStockController = Router();

MaterialStockController.get('/stocks', auth, async (req, res) => {
  const list = await m$auth.listMaterialPieChart();

  response.sendResponse(res, list);
});

MaterialStockController.get('/minmax', auth, async (req, res) => {
  let supplier = req.query.supplier;

  const list = await m$auth.listMaterialStock({ supplier: supplier });

  response.sendResponse(res, list);
});

// SW.C
MaterialStockController.get('/inout', auth, async (req, res) => {
  let materialId = req.query.material_id;
  let startdate = req.query.startdate;
  let enddate = req.query.enddate;

  const list = await m$auth.listMaterialInOut({ materialId: materialId, startdate: startdate, enddate: enddate });

  response.sendResponse(res, list);
});

module.exports = MaterialStockController;
