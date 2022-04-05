import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  containerBotoes: {
    flex: 1,
    width: '100%',
    paddingLeft: widthPercentageToDP('3%'),
    marginTop: heightPercentageToDP('10%'),
  },
  tituloPagina: {
    marginBottom: 30,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.25),
    color: '#4C4C4C',
  },
  botao: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  touchableBox: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('2%'),
    flexDirection: 'row',
    paddingRight: widthPercentageToDP('3%'),
  },
  titleButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2.25),
    color: '#007f0b',
    marginLeft: widthPercentageToDP('1.5%'),
  },
});

export default styles;
