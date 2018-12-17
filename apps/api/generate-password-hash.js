/**
 * !This is not part of API app and is used only for operations!
 *
 * Very first platform owner (employee) can not be created via API,
 * because it can be done only by platform owners.
 * Thus very first owner must be created using direct DB commands.
 * Use this program to generate password hash for very first platform owner.
 * Pass password as command line argument.
 * Result (password hash) will be printed in console.
 *
 * See `passwordHashingHook` for details
 * !Make sure value of `BCRYPT_SALT_ROUNDS` equals to the one in `passwordHashingHook`!
 */
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 10;
const args = process.argv.slice(2);
const password = args[0];

bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
  console.log(hash);
});
