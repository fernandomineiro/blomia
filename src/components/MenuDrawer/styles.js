import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  headerMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthPercentageToDP('5%'),
  },
  boxMenu: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: '#707070',
    paddingVertical: widthPercentageToDP('5%'),
  },
  textmenu: {
    left: 10,
    flex: 0.97,
    fontFamily: 'Montserrat-Regular',
  },
  icoMenu: {
    height: 20,
    width: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  labelScore: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2.25),
  },
  lineScore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default styles;
