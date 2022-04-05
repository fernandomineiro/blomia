import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },

  cameraImg: {
    height: heightPercentageToDP('5%'),
    width: heightPercentageToDP('7%'),
  },

  buttonCapturePhoto: {
    position: 'absolute',
    bottom: 20,
    padding: heightPercentageToDP('2%'),
    borderRadius: heightPercentageToDP('5%'),
    borderColor: '#fff',
    borderWidth: 3,
  },

  buttonCloseCamera: {
    position: 'absolute',
    top: heightPercentageToDP('1%'),
    right: widthPercentageToDP('2%'),
    padding: heightPercentageToDP('2%'),
  },

  buttonInverterCamera: {
    position: 'absolute',
    bottom: widthPercentageToDP('5%'),
    right: widthPercentageToDP('3%'),
    padding: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('5%'),
  },

  changeCameraImg: {
    height: heightPercentageToDP('5%'),
    width: heightPercentageToDP('5%'),
  },
});

export default styles;
