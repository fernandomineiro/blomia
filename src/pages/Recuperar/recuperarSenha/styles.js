import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  responsiveFontSize as responsiveFont
} from "react-native-responsive-dimensions";

// import { COLORS } from '../../../constantes/colors.js';


styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'

  },
  img: {
    marginTop: -20,
    width: wp('45%'),
    height: hp('20%')
  },

  selectionTextStyle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
  },
  informativeText: {
    padding: 50,
    textAlign: 'center',
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
  },
  userText: {
    marginTop: 20,
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'flex-start',
    paddingLeft: 85
  },
  btnsGroup: {
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),    
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
  },
  btnSelected: {
    backgroundColor: '#477e22',
  },
  buttonsTextStyle: {
    fontFamily: 'Montserrat-Medium',
  },
  inputUserStyle: {
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    backgroundColor: 'transparent',
    borderColor: 'rgb(196, 196, 196)',
    borderWidth: 1.8,
    paddingLeft: '10%',
    fontFamily: 'Montserrat-Medium',
  },
  clearButtonStyle: {
    left: '77%',
    bottom: '7.9%',
  },
  loginButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007f0b',
    elevation: 1,
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    marginTop: 600,
    marginBottom: 70,
    position: 'absolute'
  },
  loginButtonTextStyle: {
    color: 'white',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  // CSS FLEX BOX
  logo: {
    
    width: '100%',    
    flex: 0.1
  },
  box1: {    
    marginTop: 35,
    width: '100%',    
    flex: 0.1
  },
  box2: {    
    width: '100%',
    flex: 0.5
  },

  boxBtn: {    
    width: '100%',    
    flex: 0.3
  },
  imgLogo: {  
    marginTop: -20,
    alignSelf: 'center',
    width: wp('45%'),
    
  },
});

export default styles