const m$auth = require('../modules/material.module');
const { Router } = require('express');
const response = require('../helpers/response');
const auth = require('../middleware/auth-middleware');

const MaterialController = Router();

MaterialController.get('/stocks', auth, async (req, res) => {
  const list = await m$auth.listMaterial();

  response.sendResponse(res, list);
});

module.exports = MaterialController;
