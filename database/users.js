const db = require('./index');
const usersCollection = db.collection('users');

const getAll = async () => {
    try {
        let users = await usersCollection.get();
        let result = [];
        users.forEach((user) => {
            result.push(user.data());
        });
        return result;
    } catch(e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    getAll,
}
