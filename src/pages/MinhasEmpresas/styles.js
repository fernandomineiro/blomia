import { StyleSheet, Platform } from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 5,
    borderTopColor: '#E6E6E6',
  },
  header: {
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  saldoText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  headerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
    color: '#707070',
    marginTop: 40,
  },
  containerList: {
    minHeight:
      Platform.OS === 'android'
        ? heightPercentageToDP('55%')
        : heightPercentageToDP('50%'),
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(4),
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  containerEmpty: {
    minHeight: heightPercentageToDP('55%'),
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    width: '70%',
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(2),
    color: '#707070',
    textAlign: 'center',
  },
  containerItemList: {
    width: widthPercentageToDP(100),
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemNome: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.85),
    color: '#303030',
  },
  textItemEndereco: {
    fontFamily: 'Montserrat-Italic',
    fontSize: responsiveFontSize(1.75),
    color: '#303030',
  },
  textItem: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(1.75),
    color: '#303030',
  },
  buttonCustom: {
    marginVertical: heightPercentageToDP('8%'),
  },
  roadImage: {
    alignSelf: 'center',
    width: widthPercentageToDP('60%'),
    height: heightPercentageToDP('25%'),
    marginBottom: '5%',
  },
});

export default styles;
