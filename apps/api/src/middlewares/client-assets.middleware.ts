import * as path from 'path';
import { AppRequest } from '../app.module';
import { Middleware, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { PATH_PREFIX } from '../main';

// TODO: set in env files and default value
const PATH_TO_CLIENT_APP_BUILD_ASSETS =
  process.env.PATH_TO_CLIENT_APP_BUILD_ASSETS || '../../react-client/build';
const resolvePath = (file: string) =>
  path.resolve(`${PATH_TO_CLIENT_APP_BUILD_ASSETS}/${file}`);

/**
 * This is temporary middleware that adds serving static assets (files of react client)
 * functionality to API app.
 * It is needed to make project (API + client) work as single Heroku app.
 * Remove this after passed MVP stage and env with gateway/reverse proxy can be used.
 */
@Middleware()
export class ClientAssetsMiddleware implements NestMiddleware {
  public resolve(): MiddlewareFunction {
    return (req: AppRequest, res: Response, next: NextFunction) => {
      const { url } = req;

      if (url.startsWith(PATH_PREFIX)) {
        // Continue with API app
        next();
      } else if (url.includes('.')) {
        // This is particular file asset request
        res.sendFile(resolvePath(url));
      } else {
        // This is SPA route - return index.html
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}
