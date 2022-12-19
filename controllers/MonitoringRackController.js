const m$auth = require('../modules/monitoringRack.module');
const { Router } = require('express');
const response = require('../helpers/response');
const auth = require('../middleware/auth-middleware');

const MonitoringRackController = Router();

MonitoringRackController.get('/rack', auth, async (req, res) => {
  let type = req.query.type;
  let address = req.query.address;

  const list = await m$auth.listMonitoringRack({ type: type, address: address });

  response.sendResponse(res, list);
});

module.exports = MonitoringRackController;
