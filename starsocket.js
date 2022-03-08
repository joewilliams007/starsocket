console.log('-> S T A R T I N G');
console.log(' ');

var fileSendServer = require("./servers/starsocketFileSendServer.js")

var fileReceiveServer = require("./servers/starsocketFileReceiveServer.js")
var messageSendServer = require("./servers/starsocketMessageSendServer.js")
var messageReceiveServer = require("./servers/starsocketMessageReceiveServer.js")

var messageSendServerRegistration = require("./servers/StarSocketMessageSendRegistrationServer.js")
var messageReceiveServerRegistration = require("./servers/starsocketMessageRegistrationReceiveServer.js")

var legacySupport = require("./servers/starChatOld.js")