import {
  SET_VALUE_BALANCE,
  SET_VISIBILITY_BALANCE,
} from '../actions/actionTypes';

const initialState = {
  value: 0,
  visibility: true,
};

const balanceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_VALUE_BALANCE: {
      return {
        ...state,
        value: payload,
      };
    }
    case SET_VISIBILITY_BALANCE: {
      return {
        ...state,
        visibility: payload,
      };
    }
    default:
      return state;
  }
};

export default balanceReducer;
