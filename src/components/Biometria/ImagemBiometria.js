import React from 'react'
import { Image } from 'react-native'
import { IMAGES } from '../../constantes/images'
import {styles} from './styles'

export default class ImagemBiometria extends React.Component { 
    render () { 
        return ( 
            <Image 
                resizeMethod={'resize'}
                resizeMode={'contain'} 
                source={IMAGES.BIOMETRIA}
                style={styles.imgBiometria}
            />
        )
    }
}