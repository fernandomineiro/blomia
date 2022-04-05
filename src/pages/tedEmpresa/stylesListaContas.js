import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
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
    width: '100%',
    minHeight: heightPercentageToDP(70),
    alignItems: 'center',
    paddingTop: 10,
  },
  header: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  saldoText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  headerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFontSize(2.5),
    color: '#707070',
    marginTop: 25,
  },
  containerList: {
    width: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(8),
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
  },
  containerItemList: {
    width: widthPercentageToDP(100),
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  containerDescriptionItemList: {
    width: widthPercentageToDP(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
  },
  descriptionItemList: {
    flex: 1,
    marginVertical: 10,
  },
  textItem: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.75),
    color: '#707070',
  },
});

export default styles;
