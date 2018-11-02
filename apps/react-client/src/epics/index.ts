import { Epic } from 'redux-observable';
import { redirectUnauthenticatedEpic } from './redirect-unauthenticated.epic';

// Add all root state epics to this array and they will be combined/added to epic middleware
export const appRootEpics: Epic[] = [redirectUnauthenticatedEpic];
