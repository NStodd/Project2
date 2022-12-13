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
    const testuser = req.body.username

    User.findOne(testuser, (err, user) => {
        if(user){
            // toast popup, error message or popup
            res.render("user/signup.ejs", {message: "User Already Exists"})
        }
    })

    //create the new user
    User.create(req.body, (err, user) => {
        console.log(req.body)
        console.log("we are in the user create portion")
        if (err) {
            console.log(err)
            res.render("user/login.ejs", {message: "User Already exists."})
            // res.render('user/signup.ejs', {message: "User Already Exists"})
        }
        else {
            console.log("and here we are on the other side of it")
            console.log(`new user, ${user.username} created.`)
            console.log(user)
            req.body.name = user.habit

            // create the habit for the user
            Habit.create(req.body, (err, habit) => {
                console.log(habit)
                console.log(`new habit ${habit.name} created.`)
            })
            res.redirect("/user/login")
        }
    })
})

// The login Routes (Get => form,  post => submit form)
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/habits/")
    }
    else {
        res.render("user/login.ejs", {message: ""})
    }
})

router.post("/login", (req, res) => {
    
    const { username, password, habit } = req.body
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
        res.redirect('/user/login')
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router