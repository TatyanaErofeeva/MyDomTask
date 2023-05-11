import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirectToAnotherRoute = createAction<AppRoute>('login/redirectToAnotherRoute');