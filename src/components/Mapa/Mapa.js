import React, {Component} from 'react';
import {View, Text} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import GOOGLE_MAPS_APIKEY from '../../config/keyGoogle.js';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyCHf51ebfeCHCirXwFEF78NVd9phoUNPBM';

class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  // async componentWillMount() {
  //   let isGranted = await this.requestLocationPermission();
  //   if (isGranted) {
  //     this.getLocation();
  //   }
  // }

  // async requestLocationPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Permição para localização',
  //         message: 'Este App necessita de permissão para localizar empresas.',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     //console.warn(err);
  //   }
  // }

  getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      let newOrigin = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      };

      this.setState({
        origin: newOrigin,
      });
    });
  };

  async handleGetGoogleMapDirections(
    newLat = this.props.latitudeDest,
    newLong = this.props.longitudeDest,
  ) {
    const data = {
      source: {
        latitude: this.props.latitudeDevice,
        longitude: this.props.longitudeDevice,
      },
      destination: {latitude: newLat, longitude: newLong},
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
      ],
    };

    await getDirections(data);
  }

  render() {
    return (
      <View style={styles.containerMap}>
        <MapView
          ref={map => (this.mapView = map)}
          style={styles.map}
          region={{
            latitude: (this.props.latitudeDevice + this.props.latitudeDest) / 2,
            longitude:
              (this.props.longitudeDevice + this.props.longitudeDest) / 2,
            latitudeDelta:
              Math.abs(this.props.latitudeDevice - this.props.latitudeDest) +
              Math.abs(this.props.latitudeDevice - this.props.latitudeDest) *
                0.1,
            longitudeDelta:
              Math.abs(this.props.longitudeDevice - this.props.longitudeDest) +
              Math.abs(this.props.longitudeDevice - this.props.longitudeDest) *
                0.1,
          }}
          loadingEnabled={true}
          toolbarEnabled={true}
          zoomControlEnabled={true}>
          {// Aguar carregar valor do redux antes de acessar a função
          this.props.latitudeDest && this.props.longitudeDest && (
            <MapView.Marker
              coordinate={{
                latitude: this.props.latitudeDest,
                longitude: this.props.longitudeDest,
              }}>
              <MapView.Callout
                onPress={async () =>
                  await this.handleGetGoogleMapDirections(
                    this.props.latitudeDest,
                    this.props.longitudeDest,
                  )
                }>
                <Text>Clique aqui para ver a rota</Text>
              </MapView.Callout>
            </MapView.Marker>
          )}

          <MapView.Marker
            coordinate={{
              latitude: this.props.latitudeDevice,
              longitude: this.props.longitudeDevice,
            }}>
            <MapView.Callout>
              <Text>Você está aqui</Text>
            </MapView.Callout>
          </MapView.Marker>

          <MapViewDirections
            origin={{
              latitude: this.props.latitudeDevice,
              longitude: this.props.longitudeDevice,
            }}
            destination={{
              latitude: this.props.latitudeDest,
              longitude: this.props.longitudeDest,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
      </View>
    );
  }
}

// export default Withdraw
export default MapScreen;
