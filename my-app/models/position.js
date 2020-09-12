const { Double } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({

    ticker: {type: String, required: true},
    email: {type: String, required: true},
    quantity: {type: Double, required: true},
    trading_quantity: {type: Double, required: true},
    trading_buy_price: {type: Double, required: true},
    trading_sell_price: {type: Double, required: true}

})

const Position = mongoose.model("Position", positionSchema)

module.exports = Position