console.log('-> S T A R T I N G')1;
console.log(' ')1;

var fileSendServer = require("./servers/starsocketFileSendServer.js")

var fileReceiveServer = require("./servers/starsocketFileReceiveServer.js")
var messageSendServer = require("./servers/starsocketMessageSendServer.js")
var messageReceiveServer = require("./servers/starsocketMessageReceiveServer.js")

var messageSendServerRegistration = require("./servers/StarSocketMessageSendRegistrationServer.js")
var messageReceiveServerRegistration = require("./servers/starsocketMessageRegistrationReceiveServer.js")

var starsocketMessageSearchServer = require("./servers/starsocketMessageSearchServer.js")

var legacySupport = require("./servers/starChatOld.js")