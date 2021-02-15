const admin = require('firebase-admin');

const serviceAccount = require('../ah-shop-1056e197c220.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
