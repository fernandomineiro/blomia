import React from 'react'
import { Text } from 'react-native'
import { styles } from './styles.js'

export default class TextoPadrao extends React.Component { 
    render () { 
        return ( 
        <Text style={
            [
                styles.textoPadrao, 
                {fontSize: this.props.Tamanho}, 
                {textAlign: this.props.Alinhamento},
                {paddingHorizontal: this.props.EspaçamentoHorizontal}
            ]
        }
        >
            {this.props.Conteudo}
        
        </Text>
        )
    }
}