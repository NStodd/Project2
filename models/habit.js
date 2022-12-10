/**
 * The Habit Model
 * 
 * 
 */

const mongoose = require("./connection");

const {Schema, model} = mongoose

const habitSchema = new Schema({
    name: String, 
    username: String, 
    count: {type: Number, default: 0},
    streak: {type: Boolean, default: false}, 
    streakLength: {type: Number, default: 0},
    createdDate: {
        type: Date,
        default: Date.now()
    }, 
    last: Date 
}, {
    timestamp: true
    }
)

const Habit = model("Habit", habitSchema)

module.exports = Habit
