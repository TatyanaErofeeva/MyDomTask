import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from './api-actions/api-actions';
import { UserProcess } from '../types/state';
import { AuthorizationStatus, NameSpace } from '../const';

const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    email: '',
};

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(checkAuthAction.fulfilled, (state, action) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
                state.email = action.payload;
            })
            .addCase(checkAuthAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.authorizationStatus = AuthorizationStatus.Auth;
                state.email = action.payload;
            })
            .addCase(loginAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            });
    }
});