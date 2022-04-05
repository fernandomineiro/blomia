import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    margin: heightPercentageToDP('0.5%'),
    paddingVertical: heightPercentageToDP('0.5%'),
    paddingHorizontal: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('2%'),
    backgroundColor: '#007f0b',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: responsiveFontSize(1.1),
  },
});

export default styles;
