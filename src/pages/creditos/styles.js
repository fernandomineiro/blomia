import { Dimensions, StyleSheet } from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('100%'),
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footer: {
    // paddingTop: '15%',
    zIndex: 10,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  title: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paragraph: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  list: {
    marginVertical: heightPercentageToDP('4%'),
    width: widthPercentageToDP('100%'),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textList: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginTop: heightPercentageToDP('1%'),
  },
  textListCredit: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    marginVertical: heightPercentageToDP('2%'),
    fontSize: 14,
  },
});

export { styles };
