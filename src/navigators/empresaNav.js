import { createSwitchNavigator } from 'react-navigation';

// Paginas
import MenuEmpresa from '../pages/menuEmpresa/menuEmpresa';
import ExtratoEmpresa from '../pages/extratoEmpresa/extratoEmpresa';
import TedEmpresa from '../pages/tedEmpresa/tedEmpresa';
import TedEmpresaCadastro from '../pages/tedEmpresa/tedEmpresaCadastro';
import TedEmpresaTransferencia from '../pages/tedEmpresa/tedEmpresaTransferencia';
import TedEmpresaListaContas from '../pages/tedEmpresa/tedEmpresaListaContas';
import TedEmpresaResumo from '../pages/tedEmpresa/tedEmpresaResumo';
import DepositoBoletoEmpresa from '../pages/depositoEmpresa/depositoBoleto';
import ResumoBoletoEmpresa from '../pages/depositoEmpresa/resumoBoleto';
import ConfigEmpresa from '../pages/configEmpresa/configEmpresa';
import CadastroConfigEmpresa from '../pages/configEmpresa/cadastroConfigEmpresa';

const EmpresaNav = createSwitchNavigator(
  {
    dashboardEmpresa: {
      screen: MenuEmpresa,
    },
    extratoEmpresa: {
      screen: ExtratoEmpresa,
    },
    tedEmpresa: {
      screen: TedEmpresa,
    },
    tedEmpresaLista: {
      screen: TedEmpresa,
    },
    tedEmpresaCadastro: {
      screen: TedEmpresaCadastro,
    },
    tedEmpresaTransferencia: {
      screen: TedEmpresaTransferencia,
    },
    tedEmpresaListaContas: {
      screen: TedEmpresaListaContas,
    },
    tedEmpresaResumo: {
      screen: TedEmpresaResumo,
    },
    depositoBoletoEmpresa: {
      screen: DepositoBoletoEmpresa,
    },
    resumoBoletoEmpresa: {
      screen: ResumoBoletoEmpresa,
    },
    configEmpresa: {
      screen: ConfigEmpresa,
    },
    cadastroConfigEmpresa: {
      screen: CadastroConfigEmpresa,
    },
  },
  {
    headerMode: 'none',
  },
);

export default EmpresaNav;
