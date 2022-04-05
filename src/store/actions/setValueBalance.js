import { SET_VALUE_BALANCE } from './actionTypes';

export default function setValueBalance(saldo) {
  return {
    type: SET_VALUE_BALANCE,
    payload: saldo,
  };
}
