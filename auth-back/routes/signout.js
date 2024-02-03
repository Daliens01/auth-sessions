const { jsonResponse } = require("../lib/jsonresponse")

const router = require("express").Router()

router.post("/", (req, res)=>{
    const {username, name, password} = req.body

    if(!!username || !!name || !!password){
        return res.status(400).json(jsonResponse(400,{
            error: "fields are required"
        }))
    }

    res.status(200).json(jsonResponse(200,{
        message: "user created succesfully"
    }))
    res.send("signout")
})

module.exports = router