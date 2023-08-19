const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://work-it-dfff4-default-rtdb.firebaseio.com/"
});

module.exports = admin;