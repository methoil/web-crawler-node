// dbWorker.js

const { parentPort } = require('worker_threads');
const admin = require("firebase-admin");

//firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyDo3arEuWgOIdNDhhLfieHWs0z5U2P5UaQ",
  authDomain: "webcrawler-d8716.firebaseapp.com",
  databaseURL: "https://webcrawler-d8716.firebaseio.com",
  projectId: "webcrawler-d8716",
  storageBucket: "webcrawler-d8716.appspot.com",
  messagingSenderId: "54973578684",
  appId: "1:54973578684:web:0e2094dd9b535730597fb9",
  measurementId: "G-DFWTPT9L1W"
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
let db = admin.firestore();
// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
// recieve crawled data from main thread
parentPort.once("message", (message) => {
  console.log("Recieved data from mainWorker...");
  // store data gotten from main thread in database
  db.collection("Rates").doc(currDate).set({
    rates: JSON.stringify(message)
  }).then(() => {
    // send data back to main thread if operation was successful
    parentPort.postMessage("Data saved successfully");
  })
    .catch((err) => console.log(err))
});