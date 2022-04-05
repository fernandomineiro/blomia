import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { responsiveFontSize as responsiveFont } from "react-native-responsive-dimensions";
import { Dimensions } from "react-native";
import { COLORS } from '../../../constantes/colors'

const responsiveHeight = Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 99);
const responsiveWidth = Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 97.2);
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'black'
    backgroundColor: COLORS.BACKGROUND
  },
  boxLogo: {
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 86),
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // borderColor: '#000',
    // borderWidth: 1,
  },
  boxRow1: {
    flexDirection: 'column',
    justifyContent: 'center',
  //  borderColor: 'black',
  //  borderWidth: 1,
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 80),
    width: '85%',
    marginLeft: Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 94),

  },
  boxRow2: {
    flexDirection: 'column',
    justifyContent: 'center',
  //  borderColor: 'black',
  //  borderWidth: 1,
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 87),
    width: '85%',
    marginLeft: Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 94),
  },
  boxRow3: {
    flexDirection: 'column',
    justifyContent: 'center',
  //  borderColor: 'black',
  //  borderWidth: 1,
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 87),
    width: '85%',
    marginLeft: Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 94),
  },
  boxRow4: {
    flexDirection: 'column',
    justifyContent: 'center',
  //  borderColor: 'black',
  //  borderWidth: 1,
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 87),
    width: '85%',
    marginLeft: Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 94),
  },
  boxBtn: {
    zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  //  borderColor: 'black',
  //  borderWidth: 1,
    height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 87),
    width: '100%'
  },
  boxInputs: {
    flex: 1,
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  //  borderColor: 'black',
  //  borderWidth: 1,
    // height: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 80),
    width: '100%'
  },
  boxTitle: {
    flexDirection: 'column',
    width: '85%',
    marginTop: Dimensions.get('window').height - ((Dimensions.get('window').height / 100) * 97),
    marginLeft: Dimensions.get('window').width - ((Dimensions.get('window').width / 100) * 92),  
    alignItems:  'center',
    justifyContent: 'center',
  },
  InputText: {
    padding: 0,
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: responsiveWidth,
    height: hp('6%'),
    fontSize: responsiveFont(1.7),
    borderRadius: 300,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 300
  },
  containerDescriptions1: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 20
  },
  containerDescriptions2: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -20,
    marginLeft: 20
  },
  containerDescriptions3: {
    flexDirection: 'row',
    marginTop: -10,
    marginBottom: -20
  },
  containerForm1: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerForm2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerForm3: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imgLogo: {
    alignSelf: 'center',
    width: '45%',
    resizeMode: 'contain',
  },
  descriptionText: {     
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2)
  },
  description1: {
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 7,
    marginBottom: responsiveHeight,
    fontSize: responsiveFont(2),
    color: '#4d4d4d',
  },
  description2: {
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 9,
    marginBottom: responsiveHeight,
    fontSize: responsiveFont(2),
    color: '#4d4d4d',
  },
  formatInputZip: {
    padding: 0,
    textAlign: 'center',
    marginBottom: 15,
    height: hp('6%'),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  formatInputStreet: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: hp('7%'),
    width: wp(45),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  formatInputNumber: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: hp('7%'),
    width: wp(18),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  formatInputComplement: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: hp('7%'),
    width: wp(50),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  formatInputDistrict: {
    marginLeft: 10,
    textAlign: 'left',
    paddingLeft: 20,
    marginBottom: 15,
    height: hp('7%'),
    width: wp(73),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
    fontFamily: 'Montserrat-Medium'
  },
  continueButtonStyle: {
    marginTop: 600,
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007f0b',
    elevation: 1,
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    position: 'absolute'
  },
  requiredFields: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.5),
    color: '#4d4d4d',
  },
  saveButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    marginBottom: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
  }

});
//NOVO CSS


export default styles; 