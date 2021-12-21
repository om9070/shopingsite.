const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const data = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    payment: [{
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        tr: {
            type: String,
            required: true
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


data.methods.gettoken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.private_scr);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (e) {
        console.log("this is notpad", e);
    }
}

data.methods.adddata = async function(name, phone, tr) {
    try {
        this.payment = this.payment.concat({ name, phone, tr });
        await this.save();
        return this.payment;
    } catch (e) {
        console.log("baba", e)
    }
}

data.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

module.exports = mongoose.model("ecom", data);