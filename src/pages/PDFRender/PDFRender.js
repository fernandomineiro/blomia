import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PDFView from 'react-native-view-pdf';
import RNShareFile from 'react-native-share-pdf';

const PDFRender = ({ fileView }) => {
  const handleShared = async () => {
    const date = new Date();
    await RNShareFile.sharePDF(fileView, `${date.getTime()}boleto.pdf`);
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          width: '100%',
          paddingRight: '5%',
          height: '10%',
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={handleShared}>
          {/* <Image
            source={require('../../assets/images/share.png')}
            resizeMethod='resize'
            resizeMode='contain'
            style={{ height: 40, width: 50, backgroundColor: 'transparent' }}
          /> */}
          <Text>Compartilhar</Text>
        </TouchableOpacity>
      </View>
      <PDFView
        fadeInDuration={0}
        style={{ flex: 1 }}
        resource={fileView}
        resourceType="base64"
      />
    </View>
  );
};

export default PDFRender;
