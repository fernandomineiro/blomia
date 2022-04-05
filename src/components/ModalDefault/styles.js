import { StyleSheet } from 'react-native';
import { responsiveFontSize as responsiveFont } from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    // flex: 0.35,
    borderRadius: 20,
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalHeader: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titulo: {
    fontSize: responsiveFont(2.5),
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    justifyContent: 'center',
  },
  tituloAlert: {
    fontSize: responsiveFont(2.5),
    fontWeight: 'bold',
    color: '#DAA520',
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 0.8,
    fontWeight: 'bold',
    backgroundColor: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(3),
    alignSelf: 'flex-start',
    paddingBottom: 0,
    width: '100%',
    marginVertical: hp('3%'),
    // height: hp(9),
  },
  MsgContent: {
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    fontSize: responsiveFont(2),
    fontWeight: '300',
    color: 'black',
    textAlign: 'left',
    justifyContent: 'center',
    marginLeft: 15,
    padding: 2,
  },
  modalFooter: {
    flex: 0.2,
    fontWeight: '700',
    fontSize: responsiveFont(2),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: '#000',
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: hp('3%'),
  },
  BtnFechar: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginLeft: 15,
  },
  BtnEntrar: {
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
    color: '#007F0B',
    marginLeft: 15,
  },
  imgPadLock: {
    width: wp(80),
    height: hp(10),
    marginTop: hp(2),
  },
});

export default styles;
