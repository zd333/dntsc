import { Document, HookNextFunction } from 'mongoose';
import { hash } from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

/**
 * Can be used with any Mongoose schema that has string password property.
 * Hook must be attached to schema `pre` middleware and then it will replace
 * plain password string with built with bcrypt hash so that plain password is never stored in Db.
 * ! This should be used only in context of Mongoose schema
 * because internally relies on `this` which is expected to be document!
 */
export function passwordHashingHook(
  // Has to be mutable in this case
  /* tslint:disable-next-line:readonly-keyword */
  this: Document & { password: string },
  next: HookNextFunction,
): void {
  if (typeof next !== 'function') {
    // Something is really wrong here
    return;
  }

  // Check we are having deal with doc (duck-type) and check password was modified
  if (
    !this ||
    !this.password ||
    typeof this.isModified !== 'function' ||
    !this.isModified('password')
  ) {
    next();

    return;
  }

  // Salt is generated automatically by bcrypt
  hash(this.password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
    this.password = hashedPassword;
    next();
  });
}
