import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  imgBack: {
    width: 25,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
  imgLogo: {
    height: 40,
    width: 200,
    marginBottom: 30,
  },
  titlePage: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
    marginBottom: 20,
  },
  messageMain: {
    width: '95%',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 22,
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  titleObs: {
    fontFamily: 'Montserrat-SemiBoldItalic',
    fontSize: responsiveFontSize(2),
    width: '100%',
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 10,
    color: '#4C4C4C',
  },
  containerItem: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  imgItem: {
    marginTop: 5,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2),
  },
  itemTextBold: {
    flex: 1,
    marginLeft: 10,
    color: '#4C4C4C',
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
  },
});

export default styles;
