const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
    check('name', ERROR_MESSAGES.NAME).not().isEmpty(),
    check('email', ERROR_MESSAGES.EMAIL).isEmail(),
    check('password', ERROR_MESSAGES.PASSWORD).not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        // If User already exists

        if (user) {
            return res.status(400).json({ error: [{ msg: ERROR_MESSAGES.ALREADY_REGISTERED }]})
        }

        user = new User({
            name,
            email,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
            res.json({ token })
        });
    } catch(err) {
        console.log()
        return res.status(500).send('Server Error')
    }
});

module.exports = router;
