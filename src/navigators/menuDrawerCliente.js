import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Image } from 'react-native';

import MenuTabClient from './menuTabCliente';
import DrawerCustom from '../components/MenuDrawer/menuDrawer';
import empresaTranscao from '../pages/empresaTransacao/empresaTransacao';
import DocumentOrientationUser from '../pages/orientaçãoDocumentos/documentOrientationUser';
import FaleConosco from '../pages/faleConosco/faleConosco';
import Termos from '../pages/contrato/contrato';
import Privacidade from '../pages/privacidade/privacidade';
import DesativaPerfil from '../pages/desativaPerfil/desativaPerfil';
import Creditos from '../pages/creditos/creditos';
import DadosPessoais from '../pages/usuario/dadosPessoais/dadosPessoais';
import SwiperScreens from '../pages/swiperScreens/swiperScreens';
import MinhasEmpresas from '../pages/MinhasEmpresas';
import SenhaUser from '../pages/SenhaUser';
import DepositoDinheiro from '../pages/deposito/depositoDinheiro';
import DepositoBoleto from '../pages/deposito/depositoBoleto';
import FormDepositoBoleto from '../pages/depositoBoletoForm';
import FormDepositoBoletoRapido from '../pages/depositoBoletoRapidoForm';
import ResumoBoleto from '../pages/deposito/resumoBoleto';
import CadastroEnderecoUsuario from '../pages/usuario/enderecoUsuario/enderecoUsuario';
import DepositoCartao from '../pages/deposito/depositoCartao';
import Recibo from '../pages/recibo/recibo';
import FormCard from '../pages/formCard';
import TransferClient from '../pages/transferClient';
import ConfirmationDepositBankSplit from '../pages/deposito/confirmationDepositBankSplit';
import ConfirmationDepositCard from '../pages/deposito/confirmationDepositCard';
import ConfirmationTransferClient from '../pages/transferClient/confirmationTransferClient';

const menuDrawer = createDrawerNavigator(
  {
    HomeClient: {
      screen: MenuTabClient,
      navigationOptions: () => ({
        header: null,
      }),
    },
    empresaTranscaoClientPg: {
      screen: empresaTranscao,
    },
    DocumentOrientationUserClient: {
      screen: DocumentOrientationUser,
    },
    FaleConoscoClient: {
      screen: FaleConosco,
    },
    TermosClient: {
      screen: Termos,
    },
    PrivacidadeClient: {
      screen: Privacidade,
    },
    DesativaPerfilClient: {
      screen: DesativaPerfil,
    },
    CreditosClient: {
      screen: Creditos,
    },
    SwiperScreensClient: {
      screen: SwiperScreens,
    },
    DadosPessoaisClient: {
      screen: DadosPessoais,
    },
    MinhasEmpresasClient: {
      screen: MinhasEmpresas,
    },
    SenhaUserClient: {
      screen: SenhaUser,
    },
    DepositoDinheiroCliente: {
      screen: DepositoDinheiro,
    },
    DepositoBoletoCliente: {
      screen: DepositoBoleto,
    },
    FormDepositoBoletoCliente: {
      screen: FormDepositoBoleto,
    },
    FormDepositoBoletoRapidoCliente: {
      screen: FormDepositoBoletoRapido,
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
    TransferClient: {
      screen: TransferClient,
    },
    ConfirmationDepositBankSplitClient: {
      screen: ConfirmationDepositBankSplit,
    },
    ConfirmationTransferClient: {
      screen: ConfirmationTransferClient,
    },
    FormCardClient: {
      screen: FormCard,
    },
    ConfirmationDepositCard: {
      screen: ConfirmationDepositCard,
    },
  },
  {
    initialRouteName: 'HomeClient',
    drawerWidth: widthPercentageToDP('70%'),
    backBehavior: 'initialRoute',
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
