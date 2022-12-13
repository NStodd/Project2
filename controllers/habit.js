/**
 * Dependencies
 */
const { application } = require("express")
const express = require("express")
const Habit = require("../models/habit")
const User = require("../models/user")
//const Habits = require("../models/habit")
const UserRouter = require('./user')

/**
 * Create Router
 */
const router = express.Router()

/**
 *  Auth Middleware
 */


router.use((req, res, next) => {
    try {if (req.session.loggedIn) {
        next()
    }}
    catch{
        console.log("you are not logged in.")
        res.redirect('user/login')
    }
})

/**  ROUTES
 * ***************** Home Route ************************
 *      Checks for auth and redirects to index.       */
router.get('/', (req, res) => {
    console.log("ok, made it to the index route in habit.js")
    // TODO: this is where we need auth.
    if (req.session.loggedIn) {
        console.log("and now we are in the req.session condition here too")
        Habit.find({ username : req.session.username}).then((habits) => {
            // TODO: logic for checking for broken streaks
            const now = Date.now()
            for (habit of habits) {
                if(now - habit.last > 129600000) {
                    habit.streak = false
                    habit.streakLength = 0
                    //todo: give a message about broken streaks
                    //todo: implement longestStreak logic
                }
            }
            res.render("habit/index.ejs", { habits, loggedIn : true } )
        })        
    }
    else {
        res.redirect('/user/login', {message: "Not logged in, please log in."})
    }
})

/**
 * **************** New Route ************************
 *      Hits the new page to create a new Habit to track.
 */

router.get('/new', (req, res) => {
    res.render("habit/new.ejs", {loggedIn:true})
})

/**
 * **************** Create Route ************************
 *      To be used only when the user wants to track a 2nd habit.
 */

router.post('/', (req, res) => {

    req.body.username = req.session.username

    Habit.create(req.body, (err, newHabit) => {
        console.log(`new habit, ${newHabit.createdDate.toDateString()} created.`)
        res.redirect('/')
    })
})

/**
 * ************** Update Route ***************************
 *      The critical route of the application, runs every time the user hits the main button.
 */

router.put('/:id', (req, res) => {
    // to be used for calculations and updates
    const newLast = Date.now()
    console.log(newLast)

    Habit.findById(req.params.id, (err, foundHabit) => {
        console.log(foundHabit, "this is the found habit.")
        let updatedHabit = foundHabit
        // always increment total Habit count
        updatedHabit.count += 1
    
        // this is the streak continued condition
        if (foundHabit.streak) { //
            console.log("Keep it up!")
            // todo: let the user know
        }

        // this is the streak broken condition
        else {
            console.log("new streak started")
            // todo: let the user knowi
        }
        

        // update the last Date object parameter to be the most recent occurrence
        updatedHabit.streakLength += 1
        updatedHabit.last = newLast
        updatedHabit.streak = true

        // update the database with the updated Habit object
        Habit.findByIdAndUpdate(req.params.id, updatedHabit, {new: true}, (err, success) => {
            console.log(success, "this is the successfully updated Habit.")
            res.redirect('/')
        })
    })
})

/**
 * ***************** Delete Route ************************
 *      For removing a habit from a user.
 *      (not sure the usage for this one yet.)
 */
router.delete('/:id', async (req, res) => {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id)

    if(deletedHabit) {
        res.redirect('/')
    }
})

/**
 * Show Route
 */


/**
 * Export Router
 */
module.exports = router