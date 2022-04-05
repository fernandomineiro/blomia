import {createAppContainer} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

//PAGINAS IMPORTADDAS
import tipoCadastro from '../pages/tipoCadastro/tipoCadastro.js';
import CadUsuario from '../pages/usuario/cadastro.js';
import CheckSms from '../pages/sms/checkSms.js';
import RecuperarSenha from '../pages/Recuperar/recuperarSenha/recuperarSenha.js';
import configBiomeria from '../pages/configuraBiometria/configuraBiometria.js';
import concluiBiometria from '../pages/concluiBiometria/concluiBiometria.js';
import preAcesso from '../pages/preAcesso/preAcesso.js';

const cadastroNav = createAnimatedSwitchNavigator(
  {
    tipoCadastroPg: {
      screen: tipoCadastro,
    },
    CadUsuarioPg: {
      screen: CadUsuario,
    },
    RecuperarSenha: {
      screen: RecuperarSenha,
    },
    CheckSmsPg: {
      screen: CheckSms,
    },
    configBiometriaPg: {
      screen: configBiomeria,
    },
    concluiBiometriaPg: {
      screen: concluiBiometria,
    },
    preAcesso: {
      screen: preAcesso,
    },
  },
  {
    initialRouteName: 'tipoCadastroPg',
    headerMode: 'none',
    backBehavior: 'initialRoute',
  },
);

const CadastroNav = createAppContainer(cadastroNav);
export default CadastroNav;
