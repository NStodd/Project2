// DEPENDENCIES
//
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Habit = require("./models/habit")

// EXPRESS APP
const app = express()

// MIDDLEWARE
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use((req, res, next) => { // trying to make the habit model available in all the routes (Alex's Todo build video)
	req.models = { Habit }
	next()
})

// ROUTES
app.get("/", (req, res) => {
	res.send("<h1>The Server is Working</h1>")
})

// LISTENER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})