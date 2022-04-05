import React from 'react';
import { Image } from 'react-native';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import MenuTab from './menuTabEmpresa';
import FaleConosco from '../pages/faleConosco/faleConosco';
import Privacidade from '../pages/privacidade/privacidade';
import DesativaPerfil from '../pages/desativaPerfil/desativaPerfil';
import Creditos from '../pages/creditos/creditos';
import SwiperScreens from '../pages/swiperScreensEmpresa/swiperScreensEmpresa';
import DadosPessoais from '../pages/usuario/dadosPessoais/dadosPessoais';
import Termos from '../pages/contrato/contrato';
import MinhasSenhas from '../pages/MinhasSenhas';
import SenhaTransacao from '../pages/SenhaTransacao';
import DrawerCustom from '../components/MenuDrawer/menuDrawer';
import ExtratoEmpresa from '../pages/extratoEmpresa/extratoEmpresa';
import TedEmpresa from '../pages/tedEmpresa/tedEmpresa';
import TedEmpresaCadastro from '../pages/tedEmpresa/tedEmpresaCadastro';
import TedEmpresaTransferencia from '../pages/tedEmpresa/tedEmpresaTransferencia';
import TedEmpresaListaContas from '../pages/tedEmpresa/tedEmpresaListaContas';
import TedEmpresaResumo from '../pages/tedEmpresa/tedEmpresaResumo';
import DepositoBoletoEmpresa from '../pages/depositoEmpresa/depositoBoleto';
import FormDepositoBoletoEmpresa from '../pages/depositoBoletoFormEmpresa';
import FormDepositoBoletoRapidoEmpresa from '../pages/depositoBoletoRapidoFormEmpresa';
import ResumoBoletoEmpresa from '../pages/depositoEmpresa/resumoBoleto';
import ConfigEmpresa from '../pages/configEmpresa/configEmpresa';
import CadastroConfigEmpresa from '../pages/configEmpresa/cadastroConfigEmpresa';
import ConfirmationDepositBankSplit from '../pages/depositoEmpresa/confirmationDepositBankSplit';
import ConfirmationTransferencia from '../pages/tedEmpresa/confirmationTransferencia';

const menuDrawer = createDrawerNavigator(
  {
    HomeCompany: {
      screen: MenuTab,
      navigationOptions: () => ({
        header: null,
      }),
    },
    FaleConoscoCompany: {
      screen: FaleConosco,
    },
    TermosCompany: {
      screen: Termos,
    },
    PrivacidadeCompany: {
      screen: Privacidade,
    },
    DesativaPerfilCompany: {
      screen: DesativaPerfil,
    },
    CreditosCompany: {
      screen: Creditos,
    },
    SwiperScreensCompany: {
      screen: SwiperScreens,
    },
    DadosPessoaisCompany: {
      screen: DadosPessoais,
    },
    MinhasSenhasCompany: {
      screen: MinhasSenhas,
    },
    SenhaTransacaoCompany: {
      screen: SenhaTransacao,
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
    formDepositoBoletoEmpresa: {
      screen: FormDepositoBoletoEmpresa,
    },
    formDepositoBoletoRapidoEmpresa: {
      screen: FormDepositoBoletoRapidoEmpresa,
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
    ConfirmationDepositBankSplitCompany: {
      screen: ConfirmationDepositBankSplit,
    },
    confirmationTransferenciaCompany: {
      screen: ConfirmationTransferencia,
    },
  },
  {
    initialRouteName: 'HomeCompany',
    backBehavior: 'initialRoute',
    drawerWidth: widthPercentageToDP('70%'),
    navigationOptions: {
      headerVisible: false,
      drawerLabel: () => null,
      drawerIcon: () => {
        return (
          <Image
            source={require('../assets/images/icon_drawer.png')}
            resizeMode="contain"
            style={{ marginTop: 5, height: 30 }}
          />
        );
      },
    },
    contentComponent: DrawerCustom,
  },
);

const MenuDrawer = createStackNavigator({
  menuDrawerls: {
    screen: menuDrawer,
    navigationOptions: {
      header: null,
    },
  },
});

export default MenuDrawer;
