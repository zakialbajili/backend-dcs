const prisma = require('../helpers/database');
const Joi = require('joi');
const list = require('../dummy/materialStock.json');
const jwt = require('jsonwebtoken');

class _material {
  listMaterial = async () => {
    try {
      return {
        status: true,
        code: 200,
        list,
      };
    } catch (error) {
      console.error('listRole role module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _material();
