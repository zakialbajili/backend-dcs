const prisma = require('../helpers/database');
const Joi = require('joi');
const listMinMax = require('../dummy/minmaxStockMaterial.json');
const listInOut = require('../dummy/material_in_out.json');
const jwt = require('jsonwebtoken');

class _stock {
  listMaterialStock = async ({ supplierId: supplierId }) => {
    try {
      if (supplierId != undefined) {
        const filteredList = listMinMax.data.filter(function (item) {
          return item.material_id == materialId;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else {
        return {
          status: true,
          code: 200,
          list: listMinMax,
        };
      }
    } catch (error) {
      console.error('list min max module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };

  listMaterialInOut = async ({ month: month }) => {
    try {
      if (month != undefined) {
        const filteredList = listInOut.data.filter(function (item) {
          const monthItem = item.created_at.substring(5, 7);
          return monthItem == month;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else {
        return {
          status: true,
          code: 200,
          list: listInOut,
        };
      }
    } catch (error) {
      console.error('list summary NG module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _stock();
