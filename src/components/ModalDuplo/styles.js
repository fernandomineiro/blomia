import {StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  modalContainer: {
    width: widthPercentageToDP('80%'),
    paddingVertical: 20,
    paddingHorizontal: widthPercentageToDP('5%'),
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  modalTitleContainer: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalFiller: {
    width: '100%',
  },
  modalButtonFooter: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
});

export default styles;
