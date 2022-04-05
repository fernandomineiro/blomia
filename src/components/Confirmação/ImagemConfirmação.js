import React from 'react'
import { Image } from 'react-native'
import { IMAGES } from '../../constantes/images'
import {styles} from './styles'

export default class ImagemConfirmação extends React.Component { 
    render () { 
        return ( 
            <Image 
                resizeMethod={'resize'}
                resizeMode={'contain'} 
                source={IMAGES.CONFIRMAÇÃO}
                style={styles.imgBiometria}
            />
        )
    }
}