/**
 * Dependencies
 */
const mongoose = require("./connection")

/**
 * The User Model
 */

const {Schema, model} = mongoose

const userSchema = new Schema({
    user: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
    habit: String,
    // createdDate: Date // TODO: date stuff comes later
})

const User = model("User", userSchema)

/**
 * Export the Model
 */
module.exports = User