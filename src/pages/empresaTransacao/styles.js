import {StyleSheet, Dimensions} from 'react-native';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {COLORS} from '../../constantes/colors';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND,
  },
  containerAvoid: {
    height: heightPercentageToDP(100),
  },
  boxMapa: {
    // flex: 0.35,
    width: '100%',
    height: height / 2.5,
    // borderColor: "#000",
    // borderWidth: 1
  },
  boxEmpresas: {
    // flex: 0.4,
    height: height / 2.8,
    width: '100%',
    position: 'relative',
    // borderColor: "#000",
    // borderWidth: 1
  },
  boxButtons: {
    // flex: 0.25,
    height: height / 4,
    paddingTop: 10,
    width: '100%',
    paddingBottom: 20,
    // borderColor: "#000",
    // borderWidth: 1,
  },
  imgMapa: {
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  empresa: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    // borderColor: "#000",
    // borderWidth: 1
    justifyContent: 'center',
  },
  empresaCol_1: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
    // borderColor: "#000",
    // borderWidth: 1
  },
  empresaCol_2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.2,
    // borderColor: '#000',
    // borderWidth: 1,
  },
  empresaCol_3: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.2,
    paddingRight: 5,
    // borderColor: "#000",
    // borderWidth: 1
  },
  endEmpresa: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.7),
  },
  txtGps: {
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
