const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

let userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.verifyPassword = async function (password) {
    try {
        var result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return error;
    }
}

userSchema.methods.signToken = async function () {
    var payload = { userId: this.id, email: this.email }
    try {
        var token = await jwt.sign(payload, "thisisasecret")
        return token;
    } catch (error) {
        return error;
    }
}


userSchema.methods.userJSON = function (token) {
    return {
        name: this.name,
        email: this.email,
        token: token
    }
}


module.exports = mongoose.model("User", userSchema);
