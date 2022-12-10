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

// Update
router.put('/:id', (req, res) => {
    const newLast = new Date(Date.now())
    let updated = {}

    Habit.findById(req.params.id, (err, foundHabit) => {
        // 1. increment the Habit's count, foundHabit.count (Int)
        foundHabit.count += 1
    
        // first see if the full strings are equal (i.e. the user has already performed the habit today)
        if (newLast.toDateString() === foundHabit.last.toDateString()) {
            console.log("Great job! You've already done it today, keep it up!") //might be more than the 2nd time.
        }
        // this is the streak continuing condition (calculates the difference between the ms values)
        else if (newLast.getTime() - foundHabit.last.getTime() < 129600000) {
            console.log("congratulations, you've continued your streak")
            foundHabit.streakLength += 1
        }
        else {
            console.log("way to get back on the horse")
            foundHabit.streakLength = 1
        }

        foundHabit.last = newLast

        Habit.findByIdAndUpdate(req.params.id, foundHabit, {new: true}, (err, updatedHabit) => {
            console.log(updatedHabit)
            res.redirect('/')
        })
    })
})
// Delete
// Show

/**
 * Export Router
 */
module.exports = router