var express = require('express');
var helper = require('../service/stock.service');
const router = express.Router();

router.post("/stock", (req, res) => {

    helper.stockService(req).then(result => {
        // console.log("rrrrrrrrrrrrrrr",result)
        res.send(result);
    });
});

router.get("/fetchStock", (req, res) => {
    helper.fetchStockService(req).then(result => {
        res.send(result);
    })
})

module.exports = router;