import { SET_ADDRESS_CLIENT } from './actionTypes';

export default addressClient => {
  return {
    type: SET_ADDRESS_CLIENT,
    payload: addressClient,
  };
};
