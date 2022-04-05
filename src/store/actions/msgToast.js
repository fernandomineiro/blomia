import {SET_MSG_TOAST} from './actionTypes';

export const setMsgToast = msg => {
  return {
    type: SET_MSG_TOAST,
    payload: msg,
  };
};
