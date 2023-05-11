import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.js';
import { UserData, AuthData } from '../../types/user-data';
import { redirectToAnotherRoute } from '../action';
import { dropToken, saveToken } from '../../services/token';
import { APIRoute, AppRoute } from '../../const';

export const checkAuthAction = createAsyncThunk<string, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/checkAuth',
    async (_arg, { dispatch, extra: api }) => {
        const { data: { email } } = await api.get<UserData>(APIRoute.Login);
        return email;
    }
);


export const loginAction = createAsyncThunk<string, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/login',
    async ({ email, password }, { dispatch, extra: api }) => {
        const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
        saveToken(token);
        dispatch(redirectToAnotherRoute(AppRoute.Root));

        return email;
    },
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/logout',
    async (_arg, { dispatch, extra: api }) => {
        await api.delete(APIRoute.Logout);
        dropToken();
        dispatch(redirectToAnotherRoute(AppRoute.Login));
    },
);