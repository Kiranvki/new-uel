const mongoose = require("mongoose");

const Auth = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        },
         email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true,
            trim: true
        },
        conPassword: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            default: "user"
        },
           
    },
    {
        collection: "users",
        timestamps: true
    }
)

module.exports = mongoose.model('Auth', Auth)