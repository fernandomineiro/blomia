import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttom: {
    margin: heightPercentageToDP('1%'),
  },
  botões: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  conteudoTexto: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: responsiveFont(2.5),
    fontFamily: 'Montserrat-Medium',
    color: '#333333',
  },
  estiloTextoBotão1: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    fontSize: responsiveFont(2.0),
  },
  estiloTextoBotão2: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    fontSize: responsiveFont(2.0),
  },
});
