import { DEFINE_ROTA } from '../actions/actionTypes';
                                  
const initialState = {
  rota:  null,
};


const rotaReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFINE_ROTA:
      return {
        ...state,
        rota: action.payload.rota
      };
    default:
      return state;
  }
};


export default rotaReducer;