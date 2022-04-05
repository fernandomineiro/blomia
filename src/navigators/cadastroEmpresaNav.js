import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

//PAGINAS IMPORTADDAS
import tipoEmpresa from '../pages/empresa/tipoEmpresa/tipoEmpresa.js';
import cadastroEndereco from '../pages/empresa/cadastroEndereco/cadastroEndereco.js';
import orientacaoDoc from '../pages/empresa/orientacaoDoc/orientecaoDoc.js';
import cadastroOK from '../pages/empresa/cadastroOk/cadastroOk.js';
import docUsuario from '../pages/docUsuario/docUsuario.js';
import docEmpresa from '../pages/docEmpresa/docEmpresa.js';
import registroCompleto from '../pages/empresa/registroCompleto/registroCompleto.js';

const cadastroNav = createAnimatedSwitchNavigator(
  {
    tipoEmpresaPg: {
      screen: tipoEmpresa,
    },

    cadastroEnderecoPg: {
      screen: cadastroEndereco,
    },
    orientacaoDocPg: {
      screen: orientacaoDoc,
    },
    cadastroOKPg: {
      screen: cadastroOK,
    },
    docUsuarioPg: {
      screen: docUsuario,
    },
    docEmpresaPg: {
      screen: docEmpresa,
    },
    registroCompletoPg: {
      screen: registroCompleto,
    },
  },
  {
    initialRouteName: 'tipoEmpresaPg',
  },
);

const CadastroNav = createAppContainer(cadastroNav);
export default CadastroNav;
