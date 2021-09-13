const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const ERROR_MESSAGES = Object.freeze({
    NAME: 'Name is required',
    EMAIL: 'Please include valid email',
    PASSWORD: 'Please enter a password',
    ALREADY_REGISTERED: 'Email Already Registered'
});

// @route      POST api/users
// @desc       Register user
// @access     PUBLIC
router.post('/', [
    check('email', ERROR_MESSAGES.EMAIL).isEmail(),
    check('password', ERROR_MESSAGES.PASSWORD).not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        // If User already exists

        if (!user) {
            return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }]})
        }

        // Match password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }]})
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            }
        };


        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) {
                throw err;
            }
            return res
                .cookie("X-Auth-Token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                .json({ token });

        })
    } catch(err) {
        console.log('Error', err);
        return res.status(500).send('Server Error')
    }
});

router.get('/user', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json(user);

    } catch(err) {
        return res.status(401).json({ msg: 'unauthorized' });
    }
    return res.status(500);
});

module.exports = router;
