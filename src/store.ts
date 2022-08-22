import { rootReducer } from './rootReducer';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

store.dispatch({ type: 'END_STROKE' });
