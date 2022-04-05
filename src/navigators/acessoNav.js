import {createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

//PAGINAS IMPORTADAS
import Login from '../pages/login/login.js';
import RecuperaNav from './recuperaSenhaNav';

import Splash from '../pages/splash/splash.js';

const acessoNav = createAnimatedSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    RecuperarSenhaFlux: {
      screen: RecuperaNav,
    },
    Splash: {
      screen: Splash,
    },
  },
  {
    backBehavior: 'history',
  },
);

const AcessoNav = createAppContainer(acessoNav);
export default AcessoNav;
