module.exports = {
  sendEmbedMessage: function (Discord, logger, message, title, description, colour = '#F4B400') {
      // For documentation see https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/first-bot/using-embeds-in-messages.md
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(title)
          .setColor(colour)
          .setDescription(description)
          .setFooter('This is a community-made open source bot - if it goes down, fix it')
          .setThumbnail('https://cdn.discordapp.com/icons/333376110329069578/b5cf0e90b74a3e1b828c15a262b7a5c8.png?size=128')
          .setTimestamp();

        message.channel.send(embed);
      } catch (error) {
        logger.error('Failed to send embed message', error);
        message.channel.send('There was a problem, sorry!');
      }
    },
};
