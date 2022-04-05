import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  conteudoPagina: {
    flex: 1,
    width: widthPercentageToDP(100),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    width: widthPercentageToDP(100),
    minHeight: heightPercentageToDP(80),
    alignItems: 'center',
  },
  contentAlinhamento: {
    alignItems: 'center',
    width: widthPercentageToDP(85),
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
  titlePage: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.75),
    color: '#4c4c4c',
    marginTop: 20,
  },
  titleCadastro: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(1.75),
    color: '#4c4c4c',
    marginBottom: 10,
  },
  titleDescription: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4c4c4c',
    marginTop: 30,
    marginBottom: 20,
  },
  containerOptionHeader: {
    width: widthPercentageToDP(85),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelOptionHeader: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.5),
    color: '#4c4c4c',
    marginBottom: 5,
    marginHorizontal: 20,
  },
  fieldInput: {
    width: widthPercentageToDP(35),
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 20,
    alignItems: 'center',
  },
  textFieldInput: {
    flex: 1,
    height: 40,
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  titleOptionsDays: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4c4c4c',
    marginTop: 20,
    marginBottom: 10,
  },
  btDiaDaSemana: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  btTouch: {
    width: '100%',
    marginBottom: 30,
  },
  textBtDiaDaSemana: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#B3B3B3',
  },
  tickImgDay: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 12,
    right: 15,
    zIndex: 10,
  },
  titleValores: {
    width: '100%',
    height: 40,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  textTileValores: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  itemOptionHeader: {
    alignItems: 'center',
    flex: 1,
  },
  containerModalNotificacao: {
    width: '90%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  titleModalNotificacao: {
    fontFamily: 'Montserrat-Medium',
    color: '#4C4C4C',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  containerBotoesModalNotificacao: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  btVoltarModalNotificacao: {
    fontFamily: 'Montserrat-Medium',
    color: '#303030',
    fontSize: responsiveFontSize(2.25),
  },
  containerButtonBottom: {
    height: heightPercentageToDP(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default styles;
