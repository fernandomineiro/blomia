/* eslint-disable */
import React, { Component } from 'react';
import { Transition } from 'react-native-reanimated';
import {  createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import IconOctions from 'react-native-vector-icons/Octicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

IconOctions.loadFont();
IconAwesome.loadFont();
IconFeather.loadFont();
IconMaterialIcons.loadFont();

import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Splash from './pages/splash/splash.js';
import CadUsuarioNav from './navigators/cadastroUsuarioNav.js';
import PreAcessoNav from './navigators/preAcessoNav.js';
import AcessoNav from './navigators/acessoNav.js';
import CadastroEmpresa from './navigators/cadastroEmpresaNav.js';
import recuperaSenhaNav from './navigators/recuperaSenhaNav.js';
import MenuDrawerCliente from './navigators/menuDrawerCliente.js';
import MenuDrawerEmpresa from './navigators/menuDrawerEmpresa.js';
import CodigoSaque from './pages/codigoSaque/codigoSaque.js';
import SaqueConcluido from './pages/saqueConcluido/saqueConcluido.js';
import TransferenciaConcluida from './pages/transferenciaConcluida/transferenciaConcluida.js';
import SaqueConcluidoEmpresa from './pages/saqueConcluidoEmpresa/saqueConcluidoEmpresa.js';
import DepositoConcluido from './pages/depositoConcluido/depositoConcluido.js';
import DepositoConcluidoEmpresa from './pages/depositoConcluidoEmpresa/depositoConcluidoEmpresa.js';
import ConcluiBiometria from './pages/concluiBiometria/concluiBiometria.js';
import SwiperScreens from './pages/swiperScreens/swiperScreens.js';
import SwiperScreensEmpresa from './pages/swiperScreensEmpresa/swiperScreensEmpresa.js';
import EmpresaTransacao from './pages/empresaTransacao/empresaTransacao.js';
import BoletoEmpresa from './pages/boletoEmpresa/boletoEmpresa.js';
import TempoDisponibilização from './pages/tempoDisponibilização/tempoDisponibilização.js';
import registroCompleto from './pages/empresa/registroCompleto/registroCompleto.js';
import registroInconsistente from './pages/empresa/registroInconsistente/registroInconsistente.js';

const Rotas = createSwitchNavigator({
   splashPg: { screen: Splash },
   CadUsuarioNav: { screen: CadUsuarioNav },
   PreAcessoNav: { screen: PreAcessoNav },
   AcessoNav: { screen: AcessoNav },
   RecuperaNav: recuperaSenhaNav,
   CadastroEmpresaNav: { screen: CadastroEmpresa },
   HomeNavEmpresa: { screen: MenuDrawerEmpresa},
   HomeNavCliente: { screen: MenuDrawerCliente},
   CodigoSaque: { screen: CodigoSaque },
   SaqueConcluido: { screen: SaqueConcluido },
   TransferenciaConcluida: { screen: TransferenciaConcluida },
   SaqueConcluidoEmpresa: { screen: SaqueConcluidoEmpresa },
   DepositoConcluido: { screen: DepositoConcluido },
   DepositoConcluidoEmpresa: { screen: DepositoConcluidoEmpresa },
   ConcluiBiometria: { screen: ConcluiBiometria},
   SwiperScreensEmpresa: { screen: SwiperScreensEmpresa },
   SwiperScreens: { screen: SwiperScreens },
   EmpresaTransacao: { screen: EmpresaTransacao },
   BoletoEmpresa: { screen: BoletoEmpresa },
   TempoDisponibilização: { screen: TempoDisponibilização},
   registroCompleto: { screen: registroCompleto },
   registroInconsistente: { screen: registroInconsistente },

},
   {
      initialRouteName: 'splashPg',
      headerMode: "none",
      navigationOptions: {
         headerVisible: false,
     },
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
      // backBehavior: 'none'
   }
);


const App = createAppContainer(Rotas, {
   defaultNavigationOptions: {
   },

});

export default App;
