const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { name, email, department, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            department,
            password,
        });

        if (user) {
            res.status(201).json({
                user: { _id: user._id, name: user.name, email: user.email, department: user.department },
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ msg: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};


const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                user: { _id: user._id, name: user.name, email: user.email, department: user.department },
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(user);
        } else {
            return res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message || 'Server error' });
    }
};

module.exports = { registerUser, authUser, getUserProfile };
