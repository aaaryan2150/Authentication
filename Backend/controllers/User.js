const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60; // 1 day in seconds

const createToken = (id) => {
    return jwt.sign({ id }, "net ninja secret", {
        expiresIn: maxAge
    });
};

const Register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            // secure: true, // Uncomment if using HTTPS
            sameSite: 'lax' // Adjust as needed (e.g., 'strict' or 'none')
        });

        res.status(201).json({ message: 'Registration Successful' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            // secure: true, // Uncomment if using HTTPS
            sameSite: 'lax' // Adjust as needed (e.g., 'strict' or 'none')
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Login Failed" });
    }
};

module.exports = {
    Register,
    Login
};
