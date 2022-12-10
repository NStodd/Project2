/**
 * DEPENDENCIES
 */
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

/**
 * CONSTRUCT ROUTER
 */
const router = express.Router()

/**
 * ROUTES
 */
// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //create the new user
    User.create(req.body, (err, user) => {
        res.redirect("/user/login")
    })
})

// The login Routes (Get => form,  post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    // can also say req.body.username
    // same w/ passeword

    User.findOne({username}, (err, user) => {
        if (!user){
            res.send("user doesn't exist")
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
        res.redirect('/')
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router