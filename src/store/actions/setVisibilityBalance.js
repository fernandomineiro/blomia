import { SET_VISIBILITY_BALANCE } from './actionTypes';

export default function setVisibilityBalance(visibility) {
  return {
    type: SET_VISIBILITY_BALANCE,
    payload: visibility,
  };
}
