import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { styles } from './stylesSwiper1.js';

  export default class SwiperScreen1 extends Component { 
      render() {
          return(
            <View style={styles.slide1}>
            
                <View style={styles.header}>
                    <Image
                        resizeMode="contain"
                        resizeMethod="resize" 
                        style={styles.imageLogo} 
                        source={logo} 
                    />
                    <Text style={styles.instructions}>Como você é novo(a) por aqui, preparamos algumas dicas para te ajudar.</Text>
                </View>

                <View style={styles.content}>
                    
                    
                    <Image 
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={styles.imageTeacher}
                        source={require('../../assets/images/blended-learning.png')} 
                    />

                    <Text style={styles.instructions2}>Mas antes, vou te contar sobre o app</Text>
                    <Text style={styles.instructions3}>O Blomia dá às pessoas capacidade de sacar e depositar seu dinheiro em segundos, em qualquer lugar e com segurança.</Text>
                    <Text style={styles.instructions4}>Vamos às dicas</Text>
                </View>
            </View>

          )
      }    
  }
  
  const logo = require('../../assets/images/logo-2.png'); 
  


  