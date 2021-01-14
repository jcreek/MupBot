# MupBot

An open source Discord bot for helping coders gain experience working on open source projects.

## How to contribute (add your code to this project)

You should fork this project and submit Pull Requests with your changes, ready to be code reviewed and merged into this project.

If you want to test this code you will need to contact jcreek to get the `elasticsearch_address` and `token` needed in `config.json`. These must not be shared online or committed to the repo.

### Add a command

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

## Running the bot using Docker

### Installing Docker

If you're on Windows, visit [this website](https://docs.docker.com/docker-for-windows/install/) and download and install Docker Desktop. You'll probably need to install WSL and do some Windows updates. Once it's all installed you'll get a lovely GUI that you can use if you want to.

For Mac and Linux users, Google is your friend here.

### Dockerize the bot

To build a docker image, open a command window in the project directory and run:

`docker build -t mupbot .`

For a sanity check, you can run `docker images` and it should be displayed in that list.

### Running the Docker container

Running the bot with --detach runs the container in detatched mode (as in it runs in the background). If you want to see what is happening, remove that option.

`docker run --detach --name mupbot mupbot`

You can use CTRL+C to exit out of this command window. If you're using Windows, Docker Desktop will now show your bot under 'Containers/Apps', from where you can easily stop and start it using the GUI.

### Updating

If doing it manually, in the folder with all the files run:

```sh
docker stop mupbot
docker rm mupbot
docker image rm mupbot
docker build -t mupbot .
docker run --detach --name mupbot mupbot
```
