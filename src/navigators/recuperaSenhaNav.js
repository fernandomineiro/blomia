/* eslint-disable */
import * as React from 'react'
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import RecuperarSenhaPg from '../pages/Recuperar/recuperarSenha/recuperarSenha.js';
import ConfirmaNovaSenhaPg from '../pages/Recuperar/confirmaAltera/confirmaNovaSenha.js';
import Login from '../pages/login/login.js';
import ResetOk from '../pages/Recuperar/resetOk/resetOk.js'
import { Transition } from 'react-native-reanimated';

const recuperaSenhaNav = createAnimatedSwitchNavigator ({
    RecuperarSenhaPg: { 
        screen: RecuperarSenhaPg
    },
    ConfirmaNovaSenhaPg: { 
        screen: ConfirmaNovaSenhaPg
    },
    LoginPg: {
        screen: Login
    },
    ResetOkPg: {
        screen: ResetOk
    }
    
},
{
    // initialRouteName: 'ConfirmaNovaSenhaPg',
    transition: (
        <Transition.Together>
           <Transition.Out
              type="fade"
              durationMs={0}
              interpolation="easeIn"
           />
           <Transition.In type="fade" durationMs={0} />
        </Transition.Together>
    ),
    headerMode: "none",      
    backBehavior: 'history'
    

})
export default recuperaSenhaNav