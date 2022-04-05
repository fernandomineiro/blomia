import { SET_MSG_TOAST } from '../actions/actionTypes';

const initialState = {
  msgToast: '',
};

const getMsgToast = (state = initialState, action) => {
  switch (action.type) {
    case SET_MSG_TOAST:
      return {
        ...state,
        msgToast: action.payload,
      };
    default:
      return state;
  }
};

export default getMsgToast;
