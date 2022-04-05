import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightPercentageToDP('10%'),
    alignItems: 'center',
    position: 'relative',
  },
  contentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: widthPercentageToDP('1%'),
    borderColor: '#E0E0E0',
    paddingHorizontal: widthPercentageToDP('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP('2%'),
    zIndex: 0,
    width: '100%',
  },
  containerOptions: {
    flex: 1,
    paddingBottom: heightPercentageToDP('5%'),
  },
  contentLabel: {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 1,
    top: heightPercentageToDP('0.75%'),
    left: widthPercentageToDP('5%'),
    paddingHorizontal: widthPercentageToDP('1%'),
  },
  textLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(1.75),
    color: '#B3B3B3',
  },
  inputValue: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveFontSize(2),
    color: '#4C4C4C',
  },
  containerModal: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,

    paddingVertical: 20,
  },
  listagemModal: {
    height: heightPercentageToDP(40),
    width: widthPercentageToDP(80),
  },
  containerFooterModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: widthPercentageToDP(80),
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  textButtonFooterModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.75),
    color: '#477E22',
  },
  textTitleModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
    color: '#4D4D4D',
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollModal: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#E6E6E6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textModal: {
    color: '#4D4D4D',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.8),
  },
});

export default styles;
