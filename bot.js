const Discord = require("discord.js");
const spawn = require("child_process").spawn;
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
if (msg.content.substring(0, 1) === '!') {
        let args = msg.content.substring(1);
        const py = spawn('python',['web_scraper.py', args])
        py.stdout.on('data', (data)=>{
        	data = data.toString()
            msg.reply(data);
        })
    }
});

client.login(process.env.BOT_TOKEN);