/**
 * DEPENDENCIES
 */
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const Habit = require("../models/habit")

/**
 * CONSTRUCT ROUTER
 */
const router = express.Router()

/**
 * ROUTES
 */
// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs", {message: ""})
})

router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    // need to confirm that the user doesn't exist


    //create the new user
    User.create(req.body, (err, user) => {
        console.log(req.body)
        if (err) {
            res.render('/signup', {message: "User Already Exists"})
        }
        Habit.create({name: user.habit, username: user.username}, (err, habit) => {

        })
        res.redirect("/user/login")
    })
    // create the habit for the user

})

// The login Routes (Get => form,  post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs", {message: ""})
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    // can also say req.body.username
    // same w/ passeword

    User.findOne({username}, (err, user) => {
        if (!user){
            // toast popup, error message or popup
            res.render("user/login.ejs", {message: "User doesn't exist."})
        } else {
            const result = bcrypt.compareSync(password, user.password)
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect('/habits')
            } else {
                res.send("wrong password")
            }
        }
    })
})

router.get('/logout', (req, res) => {
    // destroy the session and redirect to main page
    req.session.destroy((err) => {
        res.redirect('/users/login')
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router