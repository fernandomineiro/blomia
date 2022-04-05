import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    height:
      Dimensions.get('window').height -
      (Dimensions.get('window').height / 100) * 85,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2.25),
    color: '#4d4d4d',
    paddingBottom: 10,
  },
  CNPJStyle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFont(1.9),
    bottom: 10,
    marginTop: 4,
    color: '#4d4d4d',
  },
  form: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    paddingTop: hp('5%'),
  },
  label: {
    color: '#4d4d4d',
    paddingRight: wp(43),
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
  },
  labelnickname: {
    color: '#4d4d4d',
    paddingRight: wp(7),
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
  },
  labelcel: {
    color: '#4d4d4d',
    paddingRight: wp(45),
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
    marginBottom: 4,
  },
  labelemail: {
    color: '#4d4d4d',
    paddingRight: wp(45),
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
  },
  labelborndate: {
    color: '#4d4d4d',
    paddingRight: wp(17),
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
  },
  labelwarningcpf: {
    color: '#4d4d4d',
    fontSize: responsiveFont(1.8),
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(20),
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputNameStyle: {
    width: wp('65%'),
    height: hp('7%'),
    borderRadius: 300,
    backgroundColor: 'transparent',
    borderColor: '#b3b3b3',
    borderWidth: 1.8,
    paddingLeft: 25,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.8),
  },
  clearButtonStyle: {
    paddingTop: 10,
    paddingLeft: 20,
    left: wp('53'),
    top: hp('0.2'),
    position: 'absolute',
    color: 'black',
  },
  clearButtonStyle2: {
    paddingTop: 10,
    paddingLeft: 20,
    left: wp('53'),
    top: hp('0.2'),
    position: 'absolute',
    color: 'black',
  },
  inputWarning: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(1.7),
    paddingLeft: wp(20),
    color: '#4d4d4d',
  },
  saveButtonStyle: {
    backgroundColor: '#007f0b',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 300,
    width: wp(65),
    height: hp(7),
    marginBottom: 10,
  },
  saveButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  footer: {
    height: '10%',
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  lineForm: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default styles;
