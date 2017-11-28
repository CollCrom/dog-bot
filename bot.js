const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const fs = require("fs");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
//read in dog pics
const text = fs.readFileSync("./dogs.txt", "utf-8");
const dogsArr = text.split("\n")


// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        const cmd = args[0];
        const rand = Math.floor(Math.random() * dogsArr.length)
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'dog':
                bot.sendMessage({
                    to: channelID,
                    message: dogsArr[rand]
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});