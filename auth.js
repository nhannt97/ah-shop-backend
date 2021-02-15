const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('./constants');
const { getAll } = require('./database/users');

const auth = async (req, res, next) => {
    try {
        const auth = req.header('Authorization') || req.header('Cookie');
        if (!auth) {
            return res.send({
                code: 401,
                error: 'Authorization failed'
            });
        }
        const token = auth.replace('token=', '').replace('Bearer', '').replace(' ', '').replace('%20', '');
        const decode = jwt.decode(token, PRIVATE_KEY);
        if (!decode || !decode.email) {
            return res.send({
                code: 401,
                error: 'Authorization failed'
            });
        }
        const { email } = decode;
        const users = await getAll();
        if (!users) {
            return res.send({
                code: 401,
                error: 'Authorization failed'
            });
        }
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.send({
                code: 401,
                error: 'Authorization failed'
            });
        }
        next();
    } catch(e) {
        console.log(e);
        res.send({
            code: 401,
            error: 'Authorization failed'
        });
    }
}

module.exports = auth;
