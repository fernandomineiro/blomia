import React, { useState, useEffect, useCallback } from 'react';

import { View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import styles from './styles';

function InputCurrency({ label, onChangeText, valueInput }) {
  const [value, setValue] = useState('0,00');
  const [isFocused, setIsFocused] = useState(false);

  const handleValueInput = useCallback(() => {
    setValue(valueInput);
  }, [valueInput]);

  useEffect(() => {
    handleValueInput();
  }, [handleValueInput]);

  const handleChangeValue = text => {
    setValue(text);
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.contentLabel}>
          <Text
            style={[
              styles.textLabel,
              isFocused || value !== '0,00'
                ? { color: '#007f0b' }
                : { color: '#B3B3B3' },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.contentInput,
          isFocused ? { borderColor: '#007f0b' } : { borderColor: '#E0E0E0' },
        ]}
      >
        <Text
          style={[
            styles.textPrefix,
            value !== '0,00' ? { color: '#4C4C4C' } : { color: '#B3B3B3' },
          ]}
        >
          R$
        </Text>
        <TextInputMask
          style={[
            styles.inputValue,
            value !== '0,00' ? { color: '#4C4C4C' } : { color: '#B3B3B3' },
          ]}
          type="money"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeValue}
          placeholder="0,00"
          value={value}
        />
      </View>
    </View>
  );
}

export default InputCurrency;
