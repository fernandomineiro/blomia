import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createAppContainer } from 'react-navigation';
import DepositoScreen from '../pages/deposito';
import DepositoDinheiro from '../pages/deposito/depositoDinheiro';
import DepositoBoleto from '../pages/deposito/depositoBoleto';
import ResumoBoleto from '../pages/deposito/resumoBoleto';
import CadastroEnderecoUsuario from '../pages/usuario/enderecoUsuario/enderecoUsuario';
import DepositoCartao from '../pages/deposito/depositoCartao';

import Recibo from '../pages/recibo/recibo';

const depositoNav = createAnimatedSwitchNavigator(
  {
    DepositoPgCliente: {
      screen: DepositoScreen,
    },
    DepositoDinheiroCliente: {
      screen: DepositoDinheiro,
    },
    DepositoBoletoCliente: {
      screen: DepositoBoleto,
    },
    ReciboPg: {
      screen: Recibo,
    },
    ResumoBoletoCliente: {
      screen: ResumoBoleto,
    },
    CadastroEnderecoCliente: {
      screen: CadastroEnderecoUsuario,
    },
    DepositoCartaoCliente: {
      screen: DepositoCartao,
    },
  },
  {
    initialRouteName: 'DepositoPgCliente',
  },
);

const DepositoNav = createAppContainer(depositoNav);
export default DepositoNav;
