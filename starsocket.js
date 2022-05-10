console.log('-> S T A R T I N G  >_<');
console.log(' ');


const Cryptr = require('cryptr');
const cryptr = new Cryptr('sportdashIsFireBro');

const encryptedString = cryptr.encrypt('johannw2004');
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0
console.log(decryptedString); // bacon



// var fileSendServer = require("./servers/starsocketFileSendServer.js")
// var fileReceiveServer = require("./servers/starsocketFileReceiveServer.js")
var messageSendServer = require("./servers/starsocketMessageSendServer.js")
var messageReceiveServer = require("./servers/starsocketMessageReceiveServer.js")


