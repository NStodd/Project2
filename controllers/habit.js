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



/**  ROUTES
 * ***************** Home Route ************************
 *      Checks for auth and redirects to index.       */
router.get('/', (req, res) => {
    // TODO: this is where we need auth.
    Habit.find().then((habits) => {
        res.render("habit/index.ejs", { habits } )
    })
})

/**
 * **************** New Route ************************
 *      Hits the new page to create a new Habit to track.
 */

router.get('/new', (req, res) => {
    res.render('/habit/new.ejs')
})

/**
 * **************** Create Route ************************
 *      To be used only when the user wants to track a 2nd habit.
 */

router.post('/', (req, res) => {

    //req.body.username = "" //TODO: need after auth worksi, req.session.username
    Habit.create(req.body, (err, newHabit) => {
        console.log(`new habit, ${newHabit.createdDate.toDateString()} created.`)
        res.json(newHabit)
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
    
        // first see if the full strings are equal (i.e. the user has already performed the habit today)
        if (newLast === updatedHabit.last) { // !todo!: make sure the comparison is correct, google search.
            console.log("Great job! You've already done it today, keep it up!") //might be more than the 2nd time.
        }
        // this is the streak continuing condition (calculates the difference between the ms values)
        else if (newLast - updatedHabit.last < 129600000) {
            console.log("congratulations, you've continued your streak")
            updatedHabit.streakLength += 1
        }
        else { // streak breaks, but that's ok!
            console.log("way to get back on the horse")
            updatedHabit.streakLength = 1
        }

        // update the last Date object parameter to be the most recent occurrence
        updatedHabit.last = newLast

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