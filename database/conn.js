const mongoose = require("mongoose");
mongoose.connect(process.env.mongodb_url).then(() => {
    console.log("connection succesfully")
}).catch((e) => {
    console.log("database", e)
})