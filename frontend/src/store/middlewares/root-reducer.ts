import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { userProcess } from '../user-process';


export const rootReducer = combineReducers({
    [NameSpace.User]: userProcess.reducer,
});