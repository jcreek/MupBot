const Discord = require('discord.js');
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');
const config = require('./config.json');
const { initialiseLogger } = require('./logger.js');
const { matchCommand } = require('./commands.js');
const client = new Discord.Client();
const logger = initialiseLogger(config, winston, Elasticsearch);

client.login(config.token);
client.once('ready', () =>{
  logger.info('MupBot logged in successfully!');
})

client.on('message', function (message) {
  // If someone tags the bot
  if (message.mentions.has(client.user.id)) {
        message.channel.send(`That's my name, don't wear it out!`);
  };

  // Ignore messages from the bot and that don't begin with the prefix, and do not run in DMs to bot
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  if (message.channel instanceof Discord.DMChannel) return;

  // Split out the fields we need from the message
  const commandBody = message.content.slice(config.prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  // Run the matching command
  matchCommand(Discord, config, logger, message, command, args);
});
