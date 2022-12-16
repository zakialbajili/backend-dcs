const prisma = require("../helpers/database");
const Joi = require("joi");
const list = require("../dummy/fgproduction.json");
const jwt = require("jsonwebtoken");

class _FGProduction {
  listFGProduction = async () => {
    try {
      return {
        status: true,
        code: 200,
        list,
      };
    } catch (error) {
      console.error("listRole role module Error: ", error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _FGProduction();
