const prisma = require('../helpers/database');
const Joi = require('joi');
const list = require('../dummy/chartmaterialStock.json');
const listMinMax = require('../dummy/minmaxStockMaterial.json');
const listInOut = require('../dummy/material_in_out.json');
// const listMonitoringRack =  require('../dummy/chartRack.json')
const jwt = require('jsonwebtoken');
class _stock {
  listMaterialPieChart = async () => {
    try {
      return {
        status: true,
        code: 200,
        list,
      };
    } catch (error) {
      console.error('liststock stock module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };

  listMaterialStock = async ({ supplier: supplier }) => {
    try {
      if (supplier != undefined) {
        const filteredList = listMinMax.data.filter(function (item) {
          return item.supplier == supplier;
          return item.supplier == supplier;
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

  listMaterialInOut = async ({ materialId: materialId, startdate: startdate, enddate: enddate }) => {
    try {
      if (materialId != undefined && startdate == undefined && enddate == undefined) {
        const filteredList = listInOut.data.filter(function (item) {
          return item.material_id == materialId;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else if (materialId == undefined && startdate != undefined && enddate != undefined) {
        const filteredList = listInOut.data.filter(function (item) {
          const monthItem = item.created_at;
          console.log(monthItem);
          return monthItem >= startdate && monthItem <= enddate;
        });
        return {
          status: true,
          code: 200,
          list: filteredList,
        };
      } else if (materialId != undefined && startdate != undefined && enddate != undefined) {
        const filteredList = listInOut.data.filter(function (item) {
          const monthItem = item.created_at;
          return monthItem >= startdate && monthItem <= enddate && item.material_id == materialId;
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
          list: listInOut.data,
        };
      }
    } catch (error) {
      console.error('list monitoring IN vs OUT Material module Error: ', error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _stock();
