import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    email: string | undefined;
};
