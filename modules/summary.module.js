const prisma = require("../helpers/database")
const Joi = require("joi")
const listNG = require("../dummy/summaryNG.json")
const listDPA = require("../dummy/summaryDPA.json")
const jwt = require('jsonwebtoken')
const { number } = require("joi")

// dayjs atau date and time
// $queryRaw

class _summary {
    // Summary NG
    listSummaryNG = async ({ materialId: materialId, month: month }) => {
        try {
            const total = [];
            let sum = 0;

            if (materialId != undefined && month == undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    return item.material_id == materialId;
                });

                filteredList.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });

                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });

                    // console.log(total);
                    return sum;
                }

                sumArray(total);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                }
            } else if (materialId == undefined && month != undefined) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });

                filteredList.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });

                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });

                    // console.log(total);
                    return sum;
                }

                sumArray(total);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                }
            } else if ((materialId != undefined && month != undefined)) {
                const filteredList = listNG.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month && item.material_id == materialId;
                });

                filteredList.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });

                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });

                    // console.log(total);
                    return sum;
                }

                sumArray(total);

                return {
                    status: true,
                    code: 200,
                    list: filteredList,
                    total_ng: sum
                }
            }
            else {
                listNG.data.filter(function (item) {
                    const totalAll = item.total;
                    total.push(totalAll);
                    return totalAll;
                });
    
                function sumArray(array) {
                    array.forEach(item => {
                        sum += item;
                    });
    
                    // console.log(total);
                    return sum;
                }
    
                sumArray(total);

                return {
                    status: true,
                    code: 200,
                    list: listNG,
                    total_ng: sum
                }
            }

        } catch (error) {
            console.error('list summary NG module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Summary DPA
    listSummaryDPA = async ({ month: month }) => {
        try {
            if (month != undefined) {
                const filteredList = listDPA.data.filter(function (item) {
                    const monthItem = item.created_at.substring(5, 7);
                    return monthItem == month;
                });
                return {
                    status: true,
                    code: 200,
                    list: filteredList
                }
            } else {
                return {
                    status: true,
                    code: 200,
                    list: listDPA
                }
            }
        }
        catch (error) {
            console.error('list summary DPA module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _summary
