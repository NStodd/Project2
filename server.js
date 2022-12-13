// DEPENDENCIES
//
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Habit = require("./models/habit")
const HabitRouter = require("./controllers/habit")
const UserRouter = require("./controllers/user")
const MongoStore = require("connect-mongo")
const session = require('express-session')

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

app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({mongoUrl: process.env.MONGO}),
		saveUninitialized: true,
		resave:false,
	})
)

app.use('/habits', HabitRouter)
app.use('/user', UserRouter)

// ROUTES
app.get("/", (req, res) => {
	console.log("ok, here we are in server.js")
	if (req.session) {
		console.log("ok, here we are in the req.session condition")
		res.redirect('/user/login')
	}
	else {
		console.log("ok, here we are being redirected to /user/login")
		res.redirect('/user/login')
	}
	//res.send("<h1>The Server is Working</h1>")
})

app.get("/login", (req, res) => {
	res.redirect("/user/login")
})


// LISTENER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})