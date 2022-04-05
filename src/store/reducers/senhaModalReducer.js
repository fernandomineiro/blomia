import { SET_SENHA_MODAL } from '../actions/actionTypes';
                                  
const initialState = {
  senhaModal: null
};


const getSenhaModal = (state = initialState, action) => {
  switch (action.type) {
    case SET_SENHA_MODAL:
      return {
        ...state,
        senhaModal: action.payload
      };
    default:
      return state;
  }
};


export default getSenhaModal;