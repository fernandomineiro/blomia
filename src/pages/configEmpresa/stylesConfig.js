import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: heightPercentageToDP('5%'),
  },
  modalInitial: {
    margin: 0,
    paddingHorizontal: 0,
  },
  imgBackModal: {
    width: 25,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
  imgLogoModal: {
    height: 40,
    width: 200,
    marginBottom: 30,
  },
  titleModal: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  textModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.8),
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  titleImgModal: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.8),
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
  },
  imgModal: {
    width: widthPercentageToDP(90),
    height: widthPercentageToDP(50),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteudoPagina: {
    flex: 1,
    minHeight: heightPercentageToDP(98),
  },
  containerPrincipal: {},
  content: {
    width: '100%',
  },
  titlePage: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
    marginTop: 20,
  },
  containerSaldo: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  textSaldo: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  containerConfiguracoes: {
    flex: 1,
    marginTop: heightPercentageToDP(3),
    borderTopColor: '#CBCBCB',
    borderTopWidth: 1,
  },
  itemConfiguracao: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,

    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 1,
  },
  containerToogle: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfo: {
    flex: 1,
  },
  containerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  imgItem: {
    width: responsiveFontSize(4.25),
    height: responsiveFontSize(4.25),
    marginHorizontal: 10,
  },
  titleItem: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2.25),
    color: '#333333',
  },
  daysItem: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.75),
    color: '#333333',
    paddingVertical: 3,
  },
  horasItem: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.75),
    color: '#333333',
    paddingBottom: 3,
  },
  statusItem: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
  },
  containerModalCreateConfig: {
    justifyContent: 'center',
    height: '33%',
    backgroundColor: '#ffffff',
  },
  containerBtSaqueDepositoModal: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textBtSaqueDepositoModal: {
    paddingLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#707070',
  },
  imgBtSaqueDepositoModal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 0.3,
    height: '100%',
    opacity: 0.5,
  },
  containerBtSaqueModal: {
    justifyContent: 'center',
    height: '33%',
    backgroundColor: '#ffffff',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
  },
  containerTextBtSaqueModal: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textBtSaqueModal: {
    paddingLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#707070',
  },
  imgBtSaqueModal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 0.3,
    height: '100%',
    opacity: 0.5,
  },
  containerBtDepositoModal: {
    justifyContent: 'center',
    height: '33%',
    backgroundColor: '#ffffff',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
  },
  containerTextBtDepositoModal: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textBtDepositoModal: {
    paddingLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#707070',
  },
  imgBtDepositoModal: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 0.3,
    height: '100%',
    opacity: 0.5,
  },
  containerModalApagar: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  titleModalApagar: {
    fontFamily: 'Montserrat-Medium',
    color: '#4C4C4C',
    fontSize: responsiveFontSize(2),
  },
  containerBotoesModalApagar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  btVoltarModalApagar: {
    fontFamily: 'Montserrat-Medium',
    color: '#303030',
    fontSize: responsiveFontSize(2.25),
  },
  btSalvarModalApagar: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ED3832',
    fontSize: responsiveFontSize(2.25),
  },
});

export default styles;
