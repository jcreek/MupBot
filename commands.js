const { sendEmbedMessage } = require('./helpers.js');

module.exports = {
  matchCommand: function (Discord, config, logger, message, command, args) {
    switch(command) {
      case 'help':
        commandHelp(Discord, config, logger, message, command, args);
        break;
      default:
        message.channel.send(`That command is not one I know yet - but you could add it! To find out more visit ${config.github_url}`);
    }
  },
};

function commandHelp (Discord, config, logger, message, command, args) {
  const msg = `
The commands available to you are:
- ${config.prefix}commandgoeshere   - Do something
  `;

  message.channel.send(msg);
}
