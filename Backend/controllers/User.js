const User = require("../models/User");
const bcrypt = require('bcrypt');

const Register = async (req,res)=>{
    try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({msg:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password:hashedPassword,
        });


        await user.save()
        res.status(201).json({message:'Registration Successful'})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const Login = async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error:'Invalid Username or Password'})
        }
        // if(user.password !== password){
        //     return res.status(401).json({error:'Invalid Username or Password'})
        // }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:'Invalid Username or Password'});
        }

        res.status(200).json({message:"login successful"})
    } catch (error) {
        res.status(500).json({error:"Login Failed"})
    }
}

module.exports = {
    Register,
    Login
}