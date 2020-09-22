const { Double } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({

    ticker: {type: String, required: true},
    email: {type: String, required: true},
    quantity: {type: Number, required: true},
    trading_quantity: {type: Number, required: true},
    trading_buy_price: {type: Number, required: true},
    trading_sell_price: {type: Number, required: true},
    cost: {type: Number, required: true},
    date: { type: Date, default: Date.now }

})

const Position = mongoose.model("Position", positionSchema)

module.exports = Position