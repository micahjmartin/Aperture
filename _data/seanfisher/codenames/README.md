"# Codenames\n\n[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)\n\nPlay the board game Codenames online with friends.\n\n## Where to Play\n\nPlay at [http://playcodenamesonline.com](http://playcodenamesonline.com) or host this yourself!\n\n## Other implementations\n\nI love how there are many different versions of this, each with their own flair and style. Here are some links of other versions I've collected.\n\n- https://codenames.game - ***NEW*** The official implementation (in beta - looks like domain was registered May 5, 2020)\n- https://www.horsepaste.com/ (https://github.com/jbowens/codenames)\n- https://www.codenamesgreen.com/\n- https://netgames.io/games/codenames\n- http://those.codes/\n- https://www.cyberspaces.app/cyberterms\n- https://codewords.tv/\n- https://captnemo.in/codenames/\n- http://codenames.roartec.com/\n- http://www.codenames.plus\n- https://ninjabunny.github.io/KodeNames/\n- https://kodenames.io\n- http://www.codewordsgame.com\n- https://playcodenames.online\n- http://kodenym.com/\n- https://hackervoiceim.in\n- https://cnames.herokuapp.com\n- https://en.codenames.me - seems broken\n- https://codenames.dport.me/ - Codenames pictures\n\n## Project architecture\n\nFront-end:\n- Vuejs scaffolded with @vue/cli\n- Socket.io client\n- Typescript/SASS/HTML\n- Generally standard vue-cli project structure, with public files in `/public` and source files in `src/client`\n\nBack-end:\n- Simple node.js Express server\n- Socket.io server\n- Server code is located in `src/server`\n\nShared:\n- Typescript game models (located in `src/lib`)\n\nGame state is maintained on the server-side in Redis and commands are sent from the client to the server. The server processes the commands based on the current game state. A locking mechanism is used to ensure game state from Redis is not subject to race conditions. Any update from the game logic causes new state to be pushed to all currently connected players.\n\n## Running the project\n\n### Project setup\n```\nnpm install\n```\n\n### Compiles and hot-reloads for development\n```\nnpm run serve:client\nnpm run serve:server\n```\n\n### Compiles and minifies for production\n```\nnpm run build:client\nnpm run build:server\n```\n\n### Run your unit tests\n```\nnpm run test:unit\n```\n\n### Run your end-to-end tests\n```\nnpm run test:e2e\n```\n\n### Lints and fixes files\n```\nnpm run lint\n```\n\n### Deploying\n\nThis project can be run entirely on Heroku (for free). Configure a Heroku dyno with the Redis add-on, set up your local Heroku CLI to connect, then push the code to the Heroku machine (`git push heroku master`). Everything should just work. The dyno URL will serve the front-end and act as the back-end.\n\nThe client and server-side will automatically be built on Heroku using the package.json `heroku-postbuild` script.\n\n\n## Code of Conduct\n\nPlease note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.\n"