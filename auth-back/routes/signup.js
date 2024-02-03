const { jsonResponse } = require("../lib/jsonresponse")
const User = require("../schema/user")
const router = require("express").Router()

router.post("/", (req, res)=>{
    const {username, name, password} = req.body

    if(!!!username || !!!name || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "fields are required"
        }))
    }

    const user = new User({
        username, name, password
    })
  user.save()

    res.status(200).json(jsonResponse(200,{
        message: "user created succesfully"
    }))
})

module.exports = router