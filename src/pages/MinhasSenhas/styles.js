import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 10,
    borderTopWidth: 5,
    borderTopColor: '#E6E6E6',
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  containerBotoes: {
    flex: 1,
    alignItems: 'center',
    width: widthPercentageToDP(80),
    marginTop: heightPercentageToDP(5),
  },
  tituloPagina: {
    marginBottom: 30,

    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.25),
    color: '#4D4D4D',
    textAlign: 'center',
  },
  botao: {
    alignItems: 'center',

    height: heightPercentageToDP(15),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: 'black',
    borderRadius: 19,

    marginBottom: 20,
  },
  touchableBox: {
    flex: 1,
    width: '100%',
    borderColor: 'transparent',
    marginRight: 5,
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 19,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleButton: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2.5),
    color: '#303030',
  },
  descriptionButton: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#303030',
  },
  imgLogo: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(10),
    marginTop: heightPercentageToDP(6),
  },
  msgPassword: {
    marginTop: heightPercentageToDP(5),
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2),
    color: '#4D4D4D',
  },
  btnCustom: {
    // marginTop: 30,
    // justifyContent: 'center',
    backgroundColor: '#333333',
    // elevation: 1,
    borderRadius: 300,
    width: widthPercentageToDP(65),
    height: heightPercentageToDP(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(10),
  },
  textBtnCustom: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Bold',
  },
  containerModalHelper: {
    width: widthPercentageToDP(90),
    padding: widthPercentageToDP(4),
    backgroundColor: '#fff',
    borderRadius: widthPercentageToDP(5),
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(8),
  },
  btCloseModalHelp: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(5),
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtCloseModalHelp: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
  },
  titleModalHelp: {
    color: '#707070',
    textAlign: 'center',
    fontSize: responsiveFontSize(2.25),
    fontFamily: 'Montserrat-Bold',
    marginTop: heightPercentageToDP(2),
  },
  textModalHelp: {
    color: '#707070',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Montserrat-Medium',
    marginTop: heightPercentageToDP(2),
  },
});

export default styles;
