const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getAll } = require('../database/users');
const { PRIVATE_KEY } = require('../constants');
const auth = require('../auth');

router.post('/login', async (req, res) => {
    const users = await getAll();
    console.log('get', users)
    if (!users) {
        return res.send({
            code: 400,
            error: 'Login failed'
        });
    }
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    console.log('find',user)
    if (!user) {
        return res.send({
            code: 400,
            error: 'Login failed'
        });
    }
    const token = jwt.sign({ email, iat: Math.floor(Date.now() / 1000) - 24 * 60 * 60}, PRIVATE_KEY, { algorithm: "HS384" });
    return res.cookie('token', 'Bearer ' + token).send({
        code: 200,
        data: { email, token }
    });
});

router.post('/logout', auth, (req, res) => {
    res.cookie('token', '').send({
        code: 200
    });
});

module.exports = router;
