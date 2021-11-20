var mongoose = require("mongoose");
var express = require('express');

var router = express.Router();

mongoose.connect("mongodb://localhost:27017/tourism", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin : String
})



const User = new mongoose.model("User", userSchema)

//Routes
router.post("/login", (req, res)=>{
    const { email, password} = req.body
    User.findOne({email:email}, (err, user) =>{
        if(user){
            if(password === user.password){
                res.send({ message: "Login Successful", user:user})
            } else{
                res.send({ message: "Password did not match"})
            }
        }else{
            res.send({ message: "User not registered"})
        }
    })
})

router.post("/register", (req, res)=>{
    const {name, email, password, isAdmin } = req.body
    User.findOne({ email: email}, (err,user) => { 
        if(user){
            res.send({ message: "User already registered"})
        }else{
            const user = new User ({
                name,
                email,
                password,
                isAdmin
            })
            user.save( err => {
                if(err) {
                    res.send(err)
                }
                else {
                    res.send({message: "Successfully Registered"})
                }
            })
        }
    })
})

module.exports = router;