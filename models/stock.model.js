var mongoose = require('mongoose');

var stocks = mongoose.Schema({
    CompanyName: { type: String },
    user: { type: String },
    StockData: { type: [Object] },
    CreatedTimeStamp: { type: Date, default: Date.now },
    UpdatedTimeStamp: { type: Date }
});



const StocksInfo = mongoose.model('StockData', stocks, 'StockData');


module.exports = {
    StocksInfo: StocksInfo
}
