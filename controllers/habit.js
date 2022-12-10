/**
 * Dependencies
 */
const { application } = require("express")
const express = require("express")
const Habits = require("../models/habit")

/**
 * Create Router
 */
const router = express.Router()

/** 
 * Routes
 */
// Index
router.get('/', (req, res) => {
    res.send("you are at the Habits Index")
})

// Create
// Edit
// Update
// Delete
// Show
// New


/**
 * Export Router
 */
module.exports = router