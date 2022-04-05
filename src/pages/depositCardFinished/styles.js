import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '10%',
    alignItems: 'center',
  },
  content: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: widthPercentageToDP('3%'),
  },
  textWithDrawComplete: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2.5),
    paddingTop: 10,
    paddingHorizontal: 100,
  },
  titleProcessing: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2.5),
    paddingTop: 10,
  },
  textWithDrawComplete2: {
    marginTop: 20,
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.2),
  },
  textWithDrawComplete3: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#007f0b',
    fontSize: responsiveFontSize(2.2),
  },
  footer: {
    height: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
