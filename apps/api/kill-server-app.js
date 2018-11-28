/**
 * This is a workaround solution to resolve nodemon not killing previous process on restart issue.
 * Is used in dev mode only, thus no actual need to look for better solution.
 * Simply kills process by port.
 * Should be used with nodemon restart event.
 */

const kill = require('kill-port');

require('dotenv').config();

serverAppKiller(process.env.API_SERVING_PORT);

async function serverAppKiller(port) {
  await kill(port);
  console.log(`Killed server app on port ${port}`);
}
