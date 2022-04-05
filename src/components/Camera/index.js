import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';

import cameraImg from '../../assets/images/camera.png';
import changeCameraImg from '../../assets/images/changeCamera.png';
import styles from './styles';

const Camera = ({ isVisible, handleCloseCamera, onChangePicture }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [typeCamera, setTypeCamera] = useState('back');

  const handleTakePicture = async () => {
    if (!cameraRef) {
      return;
    }

    try {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        forceUpOrientation: true,
        fixOrientation: true,
        pauseAfterCapture: true,
      });

      onChangePicture(uri);
    } catch (error) {
      Alert.alert('Error', 'Houve um erro ao tirar a foto');
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <RNCamera
        ref={ref => setCameraRef(ref)}
        style={styles.container}
        type={RNCamera.Constants.Type[typeCamera]}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'Prescisamos da sua permissão para usar a câmera.',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}
        captureAudio={false}
      >
        <TouchableOpacity
          onPress={handleTakePicture}
          style={styles.buttonCapturePhoto}
        >
          <Image
            source={cameraImg}
            style={styles.cameraImg}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCloseCamera}
          style={styles.buttonCloseCamera}
        >
          <Icon name="x" size={38} color="#ED3832" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setTypeCamera(typeCamera === 'back' ? 'front' : 'back')
          }
          style={styles.buttonInverterCamera}
        >
          <Image
            source={changeCameraImg}
            style={styles.changeCameraImg}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </RNCamera>
    </Modal>
  );
};

export default Camera;
