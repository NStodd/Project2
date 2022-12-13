/**
 * Dependencies
 */
const mongoose = require("./connection")

/**
 * The User Model
 */

const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    // habit: {type: String, required: true}
    // createdDate: Date // TODO: date stuff comes later
})

const User = model("User", userSchema)

/**
 * Export the Model
 */
module.exports = User