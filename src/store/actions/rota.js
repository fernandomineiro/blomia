import { DEFINE_ROTA } from './actionTypes';



  export const defineRota = rota => {
    return {
        type: DEFINE_ROTA,
        payload: {rota: rota }
    }
}


