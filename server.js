// DEPENDENCIES
//
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// EXPRESS APP
const app = express()

// MONGO CONNECTION
mongoose.connect(process.env.MONGO)

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))

// MIDDLEWARE
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// ROUTES
app.get("/", (req, res) => {
	res.send("<h1>The Server is Working</h1>")
})

// LISTENER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})