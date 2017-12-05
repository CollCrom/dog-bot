const Discord = require('discord.io');
const logger = require('winston');
const fs = require("fs");
const spawn = require("child_process").spawn;
require('dotenv').config();

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client({
   token: process.env.BOT_TOKEN,
   autorun: true
});


bot.on('ready', () => {
    console.log(bot)
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', (user, userID, channelID, message, evt) => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {
        let args = message.substring(1);
        const process = spawn('python',['./web_scraper.py', args])
        process.stdout.on('data', (data)=>{
            bot.sendMessage({
                to: channelID,
                message: data + '<--- ' + args
            });
        })
     }
});