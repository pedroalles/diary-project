import { createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

import { loadFromLocalStorage, saveToLocalStorage } from '../../helpers/localStorageManager';

// const extension = window.devToolsExtension() || ((f) => f);
// const extension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(rootReducer, loadFromLocalStorage(), extension);
const store = createStore(rootReducer, loadFromLocalStorage(), composeWithDevTools());

store.subscribe(() => saveToLocalStorage({ tasksReducer: { ...store.getState().tasksReducer, filter: { task: '', update: '' } } }));

export default store;
