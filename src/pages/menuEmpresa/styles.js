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
    justifyContent: 'center',
  },
  tituloPagina: {
    marginBottom: 30,

    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2.75),
    color: '#4C4C4C',
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
});

export default styles;
