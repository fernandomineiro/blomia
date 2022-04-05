import { createStore, combineReducers } from 'redux';
import balanceReducer from './reducers/balanceReducer';
import getSenhaModal from './reducers/senhaModalReducer';
import getMsgToast from './reducers/msgToastReducer';

import getClient from './reducers/client';

const reducers = combineReducers({
  balance: balanceReducer,
  senhaModal: getSenhaModal,
  msgToast: getMsgToast,
  client: getClient,
});

const store = () => {
  return createStore(reducers);
};

export default store;
