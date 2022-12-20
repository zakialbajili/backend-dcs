const m$auth = require("../modules/FGProduction.module");
const { Router } = require("express");
const response = require("../helpers/response");
const auth = require("../middleware/auth-middleware");

const FGProductionController = Router();

// SW.C

FGProductionController.get("/inout", auth, async (req, res) => {
  const list = await m$auth.listFGProduction();

  response.sendResponse(res, list);
});

module.exports = FGProductionController;
