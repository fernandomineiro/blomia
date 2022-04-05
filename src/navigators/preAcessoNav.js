import {createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

//PAGINAS IMPORTADDAS
import preAcesso from '../pages/preAcesso/preAcesso.js';
import tipoCadastro from '../pages/tipoCadastro/tipoCadastro.js';
import AcessoNav from './acessoNav.js';

const preAcessoNav = createAnimatedSwitchNavigator(
  {
    preAcesso: {
      screen: preAcesso,
    },
    tipoCadastro: {
      screen: tipoCadastro,
    },
    AcessoNav: {
      screen: AcessoNav,
    },
  },
  {
    initialRouteName: 'preAcesso',
    backBehavior: 'initialRoute',
  },
);

const PreAcessoNav = createAppContainer(preAcessoNav);
export default PreAcessoNav;
