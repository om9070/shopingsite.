const jwt = require("jsonwebtoken");
const model = require("../model/model");

const auth = async(req, res, next) => {
    try {

        const token = req.cookies.web;
        const very = jwt.verify(token, process.env.private_scr);
        const gdata = await model.findOne({ _id: very._id });
        if (!gdata) { console.log("something falut") }
        req.token = token;
        req.userdata = gdata;
        req.id = gdata._id;
        next();
    } catch (e) {
        console.log("auth problem ", e);
        res.status(401).json("something data");
    }
}
module.exports = auth;