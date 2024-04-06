"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twilio_1 = require("twilio");
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var twilioNumber = process.env.TWILIO_PHONE_NUMBER;
var myNumber = process.env.MY_NUMBER;
var client = new twilio_1.Twilio(accountSid, authToken);
if (accountSid && authToken && myNumber && twilioNumber) {
    var client_1 = new twilio_1.Twilio(accountSid, authToken);
    client_1.messages
        .create({
        from: twilioNumber,
        to: myNumber,
        body: "You just sent an SMS from TypeScript using Twilio!",
    })
        .then(function (message) { return console.log(message.sid); });
}
else {
    console.error("You are missing one of the variables you need to send a message");
}
