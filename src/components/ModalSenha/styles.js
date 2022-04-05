import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 0.5,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    flex: 0.1,
  },
  textTitulo: {
    marginTop: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2),
    fontWeight: 'bold',
  },
  conteudo: {
    flex: 0.5,
    paddingTop: 20,
  },
  boxActions: {
    flex: 0.3,
  },
  modalContent: {
    flex: 1,
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
  cancelar: {
    height: '25%',
    justifyContent: 'flex-end',
  },
  estiloTexto: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2.5),
  },
  placeholderPinStyle: {
    textAlign: 'center',
    width: 10,
    height: 10,
    opacity: 0.3,
    backgroundColor: '#808080',
    borderRadius: 25,
  },

  pinMaskStyle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#007f0b',
  },
  userContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secureBox: {
    width: wp('65%'),
    height: hp('7%'),
    borderWidth: 1.8,
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
