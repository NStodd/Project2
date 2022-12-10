/**
 * Dependencies
 */
const { application } = require("express")
const express = require("express")
const Habit = require("../models/habit")
//const Habits = require("../models/habit")
const UserRouter = require('./user')

/**
 * Create Router
 */
const router = express.Router()

/**
 * Middleware - TODO: needed for auth
 */
/* router.use((req, res, next) => {
    try {if (req.session.loggedIn) {
        next()
    }}
    catch{
        console.log("you are not logged in.")
        res.redirect('user/login')
    }
})*/

/** 
 * Routes
 */
// Index - show my habits
router.get('/', (req, res) => {
    // TODO: this is where we need auth.
    Habit.find().then((habits) => {
        res.render("habit/index.ejs", { habits } )
    })
})

// Track a New Habit
router.get('/new', (req, res) => {
    res.render('/habit/new.ejs')
})

// Create
router.post('/', (req, res) => {

    //req.body.username = "" //TODO: need after auth worksi, req.session.username
    Habit.create(req.body, (err, newHabit) => {
        console.log(`new habit, ${newHabit.createdDate.toDateString()} created.`)
        res.json(newHabit)
    })
    /**
     * name of the habit - comes from the form
     * username - comes from the user session
     * date
     * 0 for count
     * false for streak
     */
})

// Edit
// Update
// Delete
// Show



/**
 * Export Router
 */
module.exports = router