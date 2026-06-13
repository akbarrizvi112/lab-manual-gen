const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'labgen_super_secret_key_123');
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token && req.headers['x-auth-token']) {
        try {
            token = req.headers['x-auth-token'];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'labgen_super_secret_key_123');

            const userId = decoded.id || (decoded.teacher ? decoded.teacher.id : null);
            req.user = await User.findById(userId).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
