import * as fs from 'fs';
import * as path from 'path';
import { AppRequest } from '../app.module';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';

/**
 * This is temporary solution that adds serving static assets (files of react client)
 * functionality to API app.
 * It is needed to make project (API + client) work as single Heroku app.
 * Remove this after passed MVP stage and env with gateway/reverse proxy can be used.
 */
@Catch(NotFoundException)
export class ClientAssetsResponderFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const url = ctx.getRequest<AppRequest>().url;
    const assetPath = url.includes('.')
      ? // This is request of particular asset (file)
        resolvePathToClientAsset(url)
      : // This is SPA route - always return index.html
        resolvePathToClientAsset('index.html');

    try {
      if (fs.existsSync(assetPath)) {
        response.sendFile(assetPath);

        return;
      }
    } catch (e) {}
    // Asset (file) does not exist
    response.status(HttpStatus.NOT_FOUND).json({ message: exception.message });
  }
}

const PATH_TO_CLIENT_APP_BUILD_ASSETS =
  process.env.PATH_TO_CLIENT_APP_BUILD_ASSETS || '../../react-client/build';

function resolvePathToClientAsset(file: string): string {
  return path.resolve(`${PATH_TO_CLIENT_APP_BUILD_ASSETS}/${file}`);
}
