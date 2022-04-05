import { UPTDATE_CLIENT } from './actionTypes';

export default clientUpdated => {
  return {
    type: UPTDATE_CLIENT,
    payload: clientUpdated,
  };
};
