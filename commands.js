const { generateEmbedMessage, trim } = require('./helpers.js');
const axios = require('axios');

module.exports = {
  matchCommand: function (Discord, config, logger, message, command, args) {
    switch(command) {
      case 'help':
        commandHelp(Discord, config, logger, message, command, args);
        break;
      case 'ud':
        commandUrbanDictionary(Discord, config, logger, message, command, args);
        break;
      default:
        message.channel.send(`That command is not one I know yet - but you could add it! To find out more visit ${config.github_url}`);
    }
  },
};

function commandHelp (Discord, config, logger, message, command, args) {
  const helpMessage = `
The commands available to you are:
\`${config.prefix}ud <query>\`   - Search Urban Dictionary
\`${config.prefix}help <command>\` - For help with a specific command add the command as an argument
  `;

  // Specify specific command help
  if (args.length > 0) {
    switch (args[0]) {
      case 'ud':
        message.channel.send(`Usage: \`${config.prefix}ud <query>\`    *Example: ${config.prefix}ud yeet*`);
        break;
      default:
        message.channel.send(`That command is not one I know yet - but you could add it! To find out more visit ${config.github_url}`);
    }
  }
  else {
    message.channel.send(helpMessage);
  }
}

function commandUrbanDictionary(Discord, config, logger, message, command, args) {
  if (!args.length) {
    //If the command is used incorrectly without arguments
    return message.channel.send(`You didn't provide any arguments, ${message.author}!\nCorrect Usage: \`${config.prefix}ud <query>\``);
  }
  else if (args[0] != "") {
    const searchQuery = args[0];

    // Send a GET request to urban dictionary including the search query
    axios({
      method: 'get',
      url: 'http://api.urbandictionary.com/v0/define',
      headers: {"Content-Type": "application/json"},
      params: {"term": searchQuery}
    })
    .then(function(response) {
      const answers = response.data.list;
      if (answers.length > 0) {
        try {
          // Set up rich embed for the command to return the API response, add the first responses URL with an example of the usage and rating
          const embed = generateEmbedMessage(Discord, logger, message, answers[0].word, trim(Discord, logger, answers[0].definition, 1024));
          embed.setURL(answers[0].permalink)
          .addFields(
            { name: 'Example', value: trim(Discord, logger, answers[0].example, 1024) },
            { name: 'Rating', value: `:thumbsup: ${answers[0].thumbs_up} :thumbsdown: ${answers[0].thumbs_down}` }
          );

          if (answers.length > 1) {
            // If more than 1 definition is found, add additional fields to show the definitions of up to another 3 results
            embed.addField('Other Definitions', 'Below are some that didn\t quite cut the mustard.')

            for (let i = 1; i < answers.length && i < 4; i++) {
              const ele = answers[i];
              embed.addField(`${i}. `, `[${ele.word}](${ele.permalink})\r\n${trim(Discord, logger, ele.definition, 1024)}`)
            }
          }
          message.channel.send(embed);
        }
        catch (error) {
          logger.error('Failed to send embed message', error);
          message.channel.send('There was a problem, sorry!');
        }
      }
      else {
        // If the API returns no results for the specified query
        message.channel.send(`There are no results for *${args[0]}*`)
      }
    })
    .catch(function (error) {
      logger.error('Failed to make GET request to Urban Dictionary API', error);
    });
  }
}
