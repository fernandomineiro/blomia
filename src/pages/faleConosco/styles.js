import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: widthPercentageToDP('90%'),
  },
  footer: {
    height: widthPercentageToDP('20%'),
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  containerTitle: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
  },
  containerPhrase: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  containerMail: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  phrase: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  mail: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 19,
  },
});

export {styles};
