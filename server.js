const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })
const multer = require("multer");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require("./auth/auth");
require("./database/conn");
const model = require("./model/model");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const rasta = path.join(__dirname, "./public");
app.use(express.static(rasta));


const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

var upload = multer({
    storage: imageStorage,
})


// app.get("/", (req, res) => {
//     res.send("hello pagal banda");
// })


app.post("/register", upload.single("profile"), async(req, res) => {
    try {
        const { name, email, mobile, password, cpassword } = req.body;
        const profile = req.file.filename;
        if (!name || !email || !mobile || !password || !cpassword || !profile) {
            res.status(422).json("invaild data")
        }

        if (password === cpassword) {
            const user = new model({ name, email, mobile, password, cpassword, profile });
            await user.save();
            console.log("add succesfully")
            res.status(201).json("add succesfully")
        } else {
            res.status(422).json("invaild data")

        }

    } catch (e) {
        console.log("error part1", e);
    }
})


app.post("/logdata", async(req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json("data missimg")
        }

        const usemail = await model.findOne({ email: email })
        const token = await usemail.gettoken();
        res.cookie("web", token, {
            expires: new Date(Date.now() + 1264500000),
            httpOnly: true
        })

        if (usemail) {
            const cpass = await bcrypt.compare(password, usemail.password)


            if (cpass) {
                res.status(200).json("pass data")
            } else {
                res.status(422).json("password missimg")
            }
        } else {
            res.status(400).json("invaild data")
        }

    } catch (e) {
        res.status(422).json("invaild data")
        console.log("log in site", e);
        res.json("else part")

    }
})

app.get("/seven", auth, async(req, res) => {
    res.send(req.userdata)

})


app.get("/eight", auth, async(req, res) => {
    res.send(req.userdata)

})


app.get("/ten", auth, async(req, res) => {
    res.send(req.userdata)

})

app.get("/banana", auth, async(req, res) => {
    res.send(req.userdata)

})



app.put("/frist", [auth, upload.single("profile")], async(req, res) => {
    try {

        if (req.file === undefined) {
            const findata = await model.updateOne({ _id: req.id }, {
                $set: {
                    "name": req.body.name,
                    "email": req.body.email,
                    "mobile": req.body.mobile,
                }
            })
            if (findata) {
                res.status(201).json("every things is ok")
            } else {
                res.status(404).josn("fault")
            }
        } else {
            const findata = await model.updateOne({ _id: req.id }, {
                $set: {
                    "name": req.body.name,
                    "email": req.body.email,
                    "mobile": req.body.mobile,
                    "profile": req.file.filename,
                }
            })
            if (findata) {
                res.status(201).json("every things is ok")
            } else {
                res.status(404).josn("fault")
            }
        }


    } catch (e) {
        console.log("something fault", e);
    }
})


app.post("/four", auth, async(req, res) => {
    try {
        console.log(req.body)
        const { name, phone, tr } = req.body;
        if (!name || !phone || !tr) {
            res.status(404).json("something data");
        }

        const gdata = await model.findOne({ _id: req.id })
        if (gdata) {
            const message = await gdata.adddata(name, phone, tr);
            await gdata.save();
            res.status(201).json("ok data")
        }

    } catch (e) {
        console.log("smethign error", e)

    }
})



app.post("/mango", auth, async(req, res) => {
    try {
        console.log(req.body.e);
        const deletes = await model.findOneAndUpdate({ _id: req.id }, { $pull: { payment: { "_id": req.body.e } } });

        if (deletes) {
            res.status(201).json("yes delete")
        }


    } catch (e) {
        console.log("problem", e)
        res.status(404).json("yes delete")

    }
})


app.put("/lichi", auth, async(req, res) => {
    try {
        console.log(req.body);
        const finddata = await model.updateOne({ _id: req.id, "payment._id": req.body.id }, {
            $set: {
                "payment.$.name": req.body.op,
                "payment.$.phone": req.body.phone,
            }
        });

        if (finddata) {
            res.status(201).json("update ok")
        }
    } catch (e) {
        console.log("this last part", e);
    }
})

app.get("/logout", (req, res) => {
    res.clearCookie("web");
    res.status(201).json("use logout")
})

//for setup heruku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}




app.listen(port, () => {
    console.log("port is running", port);
})