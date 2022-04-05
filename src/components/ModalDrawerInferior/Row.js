import React,{Component} from 'react'
import {View, TouchableWithoutFeedback, Text, Image } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
export default class Row extends Component { 
    render() {
        return(
        <View style={{justifyContent: 'center', height:'33%', backgroundColor: '#ffffff', borderTopColor: 'black', borderTopWidth: 1}}>
                <TouchableWithoutFeedback>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 0.7, alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style={{paddingLeft: 10, fontFamily: 'Montserrat-Bold', fontSize: responsiveFontSize(2)}}>Teste</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 0.3, height: '100%'}}><Image style={{height: '55%'}} resizeMethod={'resize'} resizeMode={'contain'} source={require('../../assets/images/next.png')}/></View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )}
}