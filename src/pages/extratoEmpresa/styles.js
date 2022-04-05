import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  responsiveFontSize as responsiveFont,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#dfdfdf',
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
  headerBalance: {
    paddingTop: heightPercentageToDP('2%'),
    flexDirection: 'row',
    marginHorizontal: widthPercentageToDP('3%'),
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  viewImg: {
    width: widthPercentageToDP(100),
    alignItems: 'flex-start',
    paddingLeft: widthPercentageToDP(10),
    paddingTop: 15,
    marginBottom: 0,
  },

  title: {
    paddingHorizontal: 0,
    paddingBottom: 10,
    margin: 0,
    fontSize: responsiveFont(2.75),
    lineHeight: 25,
    color: '#707070',
  },

  searchContainer: {
    display: 'flex',
    flexDirection: 'row',

    marginHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    width: widthPercentageToDP(90),
    borderRadius: widthPercentageToDP('1%'),
    marginTop: 5,
  },

  searchTextStyle: {
    fontFamily: 'Montserrat-Medium',
    flex: 1,
    fontSize: responsiveFont(1.95),
    marginHorizontal: 5,
    paddingVertical: 5,
  },

  btMenus: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: widthPercentageToDP(100),
    paddingTop: 20,
    paddingBottom: 10,
  },
  btnMenu: {
    borderRadius: 300,
    width: 110,
    height: 40,
    justifyContent: 'center',
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  textBtnMenu: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Bold',
  },
  itemContainer: {
    flexDirection: 'column',
    width: widthPercentageToDP(90),
    alignItems: 'center',
  },
  itemInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemInfoHeader: {
    fontFamily: 'Montserrat-Regular',
    color: '#4c4c4c',
    fontSize: responsiveFont(2),
  },
  itemInfoType: {
    fontFamily: 'Montserrat-Bold',
    color: '#4c4c4c',
    fontSize: responsiveFont(1.75),
  },
  containerInfoValue: {
    paddingHorizontal: 5,
    alignItems: 'flex-end',
  },
  itemInfoValue: {
    fontFamily: 'Montserrat-Medium',
    color: '#4c4c4c',
    fontSize: responsiveFont(1.75),
  },
  itemInfoCost: {
    fontFamily: 'Montserrat-Regular',
    color: '#4c4c4c',
    fontSize: responsiveFont(1.75),
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemInfoDay: {
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    color: '#35791F',
    fontSize: responsiveFont(2),
  },
  itemTotalDay: {
    fontFamily: 'Montserrat-Bold',
    color: '#4c4c4c',
    fontSize: responsiveFont(1.75),
    marginRight: 15,
  },
  modal: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 0.3,
    width: '70%',
    paddingVertical: 31,
    bottom: 45,
  },
  modalDate: {
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 0.4,
    width: '70%',
    paddingVertical: 31,
    bottom: 45,
  },
  containerModal: {
    width: '100%',
    alignItems: 'flex-end',
  },
  containerModalDate: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnCloseModal: {
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    alignItems: 'center',
    marginRight: 10,
  },
  btnFiltrarModal: {
    borderRadius: 20,
    width: '70%',
    height: 40,
    justifyContent: 'center',
    borderColor: '#35791F',
    backgroundColor: '#35791F',
    borderWidth: 0.5,
    alignItems: 'center',
    marginRight: 10,
  },
  bodyModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bodyModalDate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleModalDate: {
    fontSize: responsiveFont(2.5),
    fontFamily: 'Montserrat-Bold',
    color: '#35791F',
    flex: 1,
    paddingLeft: 20,
  },
  codigoModal: {
    fontSize: responsiveFont(5),
    fontFamily: 'Montserrat-Medium',
    marginTop: 30,
  },
  linkModal: {
    marginTop: 30,
  },
  cabecalhoDate: {
    width: 200,
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-Medium',
    marginTop: 15,
    marginBottom: 10,
  },
  btCalendar: {
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtData: {
    fontSize: responsiveFont(2),
    color: '#535353',
  },
  msgFiltroData: {
    paddingBottom: 10,
    fontSize: responsiveFont(1.75),
    fontFamily: 'Montserrat-Medium',
    color: '#4C4C4C',
  },
  msgTotal: {
    paddingTop: 10,
    fontSize: responsiveFont(2),
    fontFamily: 'Montserrat-SemiBold',
    color: '#4C4C4C',
    width: '100%',
    textAlign: 'right',
    marginRight: 40,
  },
  messageEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMessageEmpty: {
    fontFamily: 'Montserrat-Medium',
    fontSize: responsiveFont(2.25),
    color: '#4C4C4C',
    textAlign: 'center',
    marginTop: heightPercentageToDP(20) * -1,
  },
  itemInfoLink: {
    fontSize: responsiveFont(1.75),
    fontFamily: 'Montserrat-Bold',
  },
  textoExpiracao: {
    fontSize: responsiveFont(1.25),
    fontFamily: 'Montserrat-Italic',
    color: '#ed3832',
  },
});

export default styles;
