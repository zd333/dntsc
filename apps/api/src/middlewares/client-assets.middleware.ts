import * as path from 'path';
import { AppRequest } from '../app.module';
import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { PATH_PREFIX } from '../main';

const PATH_TO_CLIENT_APP_BUILD_ASSETS =
  process.env.PATH_TO_CLIENT_APP_BUILD_ASSETS || '../../react-client/build';

/**
 * This is temporary middleware that adds serving static assets (files of react client)
 * functionality to API app.
 * It is needed to make project (API + client) work as single Heroku app.
 * Remove this after passed MVP stage and env with gateway/reverse proxy can be used.
 */
@Injectable()
export class ClientAssetsMiddleware implements NestMiddleware {
  public resolve(): MiddlewareFunction {
    return (req: AppRequest, res: Response, next: NextFunction) => {
      const { url } = req;

      if (normalizeUrl(url).startsWith(normalizeUrl(PATH_PREFIX))) {
        // Continue with API app
        next();
      } else if (url.includes('.')) {
        // This is request of particular asset (file)
        res.sendFile(resolvePath(url));
      } else {
        // This is SPA route - always return index.html
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}

function resolvePath(file: string): string {
  return path.resolve(`${PATH_TO_CLIENT_APP_BUILD_ASSETS}/${file}`);
}

function normalizeUrl(url: string): string {
  return url.startsWith('/') ? url.substr(1).toLowerCase() : url.toLowerCase();
}
