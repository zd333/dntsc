import { signInApiConnector } from './sign-in.api-connector';

/**
 * This should have structure that follows epic middleware dependency injection interface.
 * See `createEpicMiddleware`.
 */
export const rootApiConnectors = { signInApiConnector };
