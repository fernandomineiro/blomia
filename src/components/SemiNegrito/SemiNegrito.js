import React from 'react'
import { Text } from 'react-native'
import { styles } from './styles.js'

export default class TextoSemiNegrito extends React.Component { 
    render () { 
        return ( 
        <Text style={[styles.semiNegrito, {fontSize: this.props.Tamanho}, {textAlign: this.props.Alinhamento}]}>{this.props.Conteudo}</Text>
        )
    }
}