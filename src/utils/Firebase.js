const firebase = require("firebase")

var firebaseConfig = {
  apiKey: "AIzaSyAKFggIA0kv2MPdKVLgraFjL-dZMafwC0c",
  authDomain: "virsec-7f70d.firebaseapp.com",
  databaseURL: "https://virsec-7f70d.firebaseio.com",
  projectId: "virsec-7f70d",
  storageBucket: "virsec-7f70d.appspot.com",
  messagingSenderId: "495775893833",
  appId: "1:495775893833:web:e57d039b22bfffb16c3298"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  
module.exports = {firebase}