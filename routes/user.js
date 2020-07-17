const express = require('express');
const router = express();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth = require('../middleware/auth');

router.get('/me',auth, async (req, res) => {
    const result = await User.findById(req.user._id).select('-password');
    res.send(result);
});

router.post('/', async (req, res) => {
    const { validateUser } = validate(req.body);
    if (validateUser) return res.status(400).send(validate.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exist');

    let salt = await bcrypt.genSalt(10);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    });

    await user.save();
    const token = jwt.sign({ _id:user._id, isAdmin: user.isAdmin },config.get('jwtPrivateKey'));

    let result = _.pick(user, ['_id', 'email', 'name']);
    res.header('x-auth-token', token).send(result);
});

module.exports = router;