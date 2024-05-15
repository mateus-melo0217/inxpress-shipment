import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';
import {bolInfoReducer, bol_InfoReducer, freightHistoryInfoReducer, savedQuotesReducer, authReducer, quotesInfoReducer, headerReducer} from '../reducers';

const rootReducer = combineReducers( {bolInfoReducer: bolInfoReducer, bol_InfoReducer:bol_InfoReducer, freightHistoryInfoReducer: freightHistoryInfoReducer, quotesInfoReducer: quotesInfoReducer, savedQuotesReducer: savedQuotesReducer, authReducer: authReducer, headerReducer: headerReducer} );
export const store = configureStore({
    reducer: rootReducer,
    middleware: []
    // middleware: [logger]
})

export type RootState = ReturnType<typeof rootReducer>;