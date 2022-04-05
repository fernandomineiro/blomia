import React from 'react' 
import { View, Image } from 'react-native'
import { IMAGES } from '../../constantes/images'
import {styles} from './styles'

export default class LogoBlomia extends React.Component { 
    render () {
        return (
            <Image 
                resizeMethod='resize'
                resizeMode='contain'
                style={styles.imgLogo} 
                source={IMAGES.LOGO}
            />
    )}
}