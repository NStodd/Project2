/**
 * Import Dependencies
 */
require("dotenv").config()
const mongoose = require('mongoose')

/**
 * Database Connections
 */
const DATABASE_URL = process.env.MONGO
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology:true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => {console.log("Connected to Mongo")})
    .on("close", () => {console.log("Disconnected from Mongo")})
    .on("error", (err) => {console.log(error)})

/**
 * Export Connection
 */
module.exports = mongoose