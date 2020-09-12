const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const user = require("./routes/users");
const mongoose = require("mongoose");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

app.use("/user", user);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/quickmoneyUsers");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


