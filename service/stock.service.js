var stockModel = require('../models/stock.model');
var moment = require('moment');
const neatCsv = require('neat-csv');
const fs = require('fs')

module.exports.stockService = function (request) {
    return new Promise((resolve, reject) => {
        if (request.body.hasOwnProperty('CompanyName') && request.body.hasOwnProperty('user')) {
            fs.readFile('./stockdata.csv', async (err, data) => {
                if (err) {
                    console.error(err)
                    resolve(err)
                }
                let stockdata = await neatCsv(data)
                stockModel.StocksInfo.find({ "CompanyName": request.body.CompanyName, "user": request.body.user }).then(data => {
                    if (data.length > 0) {
                        stockModel.StocksInfo.updateMany({
                            "_id": data[data.length - 1]._id
                        }, {
                            $push: {
                                "StockData": stockdata
                            }
                        },
                            {
                                $set: {
                                    "CompanyName": request.body.CompanyName,
                                    "user": request.body.user,
                                    "UpdatedTimeStamp": moment.utc()
                                }
                            }).then(updatedData => {
                                if (updatedData.n === 1) {
                                    resolve({ "StockData": stockdata })
                                }
                                else {
                                    resolve({ "StockData": stockdata })
                                }
                            })
                    }
                    else {
                        stockModel.StocksInfo.create({ "CompanyName": request.body.CompanyName, "user": request.body.user, "CreatedTimeStamp": moment.utc(), "StockData": stockdata }).then(createdData => {
                            if (createdData._id) {
                                resolve({ "StockData": stockdata })
                            }
                            else {
                                resolve({ "StockData": stockdata })
                            }
                        })
                    }
                }).catch(err => {
                    reject(err);
                })
            })
        }
        else {
            resolve({ Status: 400, Message: "Required Inputs Missing" })
        }

    })
}

module.exports.fetchStockService = function (request) {
    return new Promise((resolve, reject) => {
        stockModel.StocksInfo.find({}, { "_id": 0, "CompanyName": 1, "user": 1 }).sort({ _id: -1 }).then(data => {
            if (data.length > 0) {
                resolve(data)
            }
            else {
                resolve({ "Status": "No Data Found" })
            }

        }).catch(err => {
            reject(err);
        })
    })
}