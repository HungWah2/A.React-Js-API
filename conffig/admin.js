const admin = require("firebase-admin");
const firebase = require("firebase");

// cấu hình Firebase Admin SDK
const serviceAccount = require("./data-58389-firebase-adminsdk-hi3p5-2e4ed677d5.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
db=admin.firestore()
module.exports = {db}

const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// cấu hình Firebase Client SDK