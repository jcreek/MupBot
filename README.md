# MupBot

An open source Discord bot for helping coders gain experience working on open source projects.

## How to contribute (add your code to this project)

You should fork this project and submit Pull Requests with your changes, ready to be code reviewed and merged into this project.

If you want to test this code you will need to contact jcreek to get the `elasticsearch_address` and `token` needed in `config.json`. These must not be shared online or committed to the repo.

## Add a command

To add a command, edit the `commands.js` file.

You need to create a function containing the code you want to run, and add a case that matches your desired command.

For example, for the command 'example' you would need to add the case:

```js
case 'example':
  commandExample(Discord, config, logger, message, command, args);
  break;
```

You would also need to add the function:

```js
function commandExample (Discord, config, logger, message, command, args) {
  // Your code goes here
}
```

Notice the naming convention for the function is 'command' followed by your desired command, in camelCase. For example, a command of `thisisalongcommand` would have a function called `commandThisIsALongCommand`.
