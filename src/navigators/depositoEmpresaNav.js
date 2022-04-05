import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Deposito from '../pages/depositoEmpresa/depositoEmpresa.js';
import Recibo from '../pages/recibo/recibo.js';
import {createAppContainer} from 'react-navigation';

const depositoNav = createAnimatedSwitchNavigator(
  {
    DepositoPg: {
      screen: Deposito,
    },
    ReciboPg: {
      screen: Recibo,
    },
  },
  {
    initialRouteName: 'DepositoPg',
  },
);

const DepositoNav = createAppContainer(depositoNav);
export default DepositoNav;
