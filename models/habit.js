/**
 * The Habit Model
 * 
 * 
 */

const mongoose = require("./connection");

const {Schema, model} = mongoose

const habitSchema = new Schema({
    name: String, 
    user: String, 
    count: Number,
    streak: Boolean,
    streakLength: Number,
    // last: Date // TODO: add the date value last.
})

const Habit = model("Habit", habitSchema)

module.exports = Habit
