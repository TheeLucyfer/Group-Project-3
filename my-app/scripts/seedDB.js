const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/quickmoneyusers"
);

const positionSeed = [
  {
    ticker: 'AAPL',
    email: 'zkdtckk@gmail.com',
    quantity: 15.0,
    trading_quantity: 10.0,
    trading_buy_price: 105.2,
    trading_sell_price: 120.3,
    cost:100.0,
    date: new Date(Date.now())
  },
  {
    ticker: 'TSLA',
    email: 'zkdtckk@gmail.com',
    quantity: 15.0,
    trading_quantity: 10.0,
    trading_buy_price: 320.5,
    trading_sell_price: 1000.5,
    cost:420.0,
    date: new Date(Date.now())
  },
  {
    ticker: 'TSLA',
    email: 'zhouzongju@gmail.com',
    quantity: 15.0,
    trading_quantity: 10.0,
    trading_buy_price: 320.5,
    trading_sell_price: 1000.5,
    cost:420.0,
    date: new Date(Date.now())
  }
];

console.log(db);

db.Position
  .remove({})
  .then(() => db.Position.collection.insertMany(positionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
