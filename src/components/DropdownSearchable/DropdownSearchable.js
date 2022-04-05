import {View, TextInput} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import React, {Component, Fragment} from 'react';
import {responsiveFontSize as responsiveFont} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SearchableDropdown from 'react-native-searchable-dropdown';
import {MUNICIPIOS} from '../../constantes/municipios';

import {TextInputMask} from 'react-native-masked-text';

// var items = [
//     {
//       id: 1,
//       name: 'JavaScript',
//     },
//     {
//       id: 2,
//       name: 'Java',
//     },
//     {
//       id: 3,
//       name: 'Ruby',
//     },
//     {
//       id: 4,
//       name: 'React Native',
//     },
//     {
//       id: 5,
//       name: 'PHP',
//     },
//     {
//       id: 6,
//       name: 'Python',
//     },
//     {
//       id: 7,
//       name: 'Go',
//     },
//     {
//       id: 8,
//       name: 'Swift',
//     },
//   ];

let objectMunicipios = MUNICIPIOS.map(function(municipio) {
  return {name: municipio};
});

objectMunicipios.forEach((item, i) => {
  item.id = i + 1;
});

export default class DropdownSearchable extends Component {
  //   render() {
  /* Exemplo de implementação
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
    */
  //     let objectMunicipios = MUNICIPIOS.map(function(municipio) {
  //         return {  value: municipio }
  //     })

  //     return (
  //     <View style={{top: 200, width: 500}}>
  //       <Dropdown
  //         label='Favorite Fruit'
  //         data={objectMunicipios}
  //         onChangeText={() => {}}
  //       />
  //     </View>
  //     );
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      zipValue: false,
      value: '',
    };
  }

  handleZipCode = text => {
    this.setState({value: text});
    if (this.state.value.length == 7) {
      this.setState({zipValue: true});
      /* Valor sem formatação
        const unmasked = this.zipCodeField.getRawValue()

        */
    }
  };
  render() {
    return (
      <View style={{width: '40%'}}>
        <Fragment>
          {/* Multi */}
          <SearchableDropdown
            multi={false}
            selectedItems={this.state.selectedItems}
            onItemSelect={item => {
              const items = this.state.selectedItems;
              items.push(item);
              this.setState({selectedItems: items});
            }}
            containerStyle={{padding: 5}}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter(
                sitem => sitem.id !== item.id,
              );
              this.setState({selectedItems: items});
            }}
            itemStyle={{
              zIndex: 1,
              width: 250,
              height: hp('6%'),
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#bbb',
              borderWidth: 1,
              fontFamily: 'Montserrat-Medium',
            }}
            itemTextStyle={{color: '#222', fontFamily: 'Montserrat-Medium'}}
            itemsContainerStyle={{maxHeight: 130, width: 300, zIndex: 1}}
            items={objectMunicipios}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={{
              editable: this.props.isEditable,
              placeholder: 'Cidade',
              underlineColorAndroid: 'transparent',
              style: {
                width: 250,
                height: hp('6%'),
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc' || this.props.cityBorderColor,
                backgroundColor: '' || this.propscityBackgroundColor,
                borderRadius: 300,
                fontFamily: 'Montserrat-Medium',
                fontSize: responsiveFont(1.8),
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
          {/* Single */}
        </Fragment>
        {/* <TextInputMask ref={(ref) => this.zipCodeField = ref} type={'zip-code'} value={this.state.value} maxLength={8} placeholder={'Aqui'} onChangeText={text => this.handleZipCode(text)}></TextInputMask> */}
      </View>
    );
  }
}
