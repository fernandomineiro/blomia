import { SET_CLIENT } from './actionTypes';

export default client => {
  return {
    type: SET_CLIENT,
    payload: client,
  };
};
