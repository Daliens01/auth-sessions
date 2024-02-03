const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config()
const app = express();
const port = process.env.PORT ||  4000;
app.use(cors());
app.use(express.json())

async function connectDB (){
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log("MONGO CONECTED");
}

connectDB().catch(console.error)
app.use("/login", require("./routes/login"))
app.use("/refresh-token", require("./routes/refreshToken"))
app.use("/signout", require("./routes/signout"))
app.use("/signup", require("./routes/signup"))
app.use("/todos", require("./routes/todos"))
app.use("/user", require("./routes/user"))
app.get("/", (req,res)=>{
    res.send("Wellcome to Api");
})

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})