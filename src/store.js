import { createStore } from 'redux';
import contactsReducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('contacts');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('contacts', serializedState);
  } catch {
    // ignore write errors
  }
};

const store = createStore(
  contactsReducer,
  loadState(),
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;