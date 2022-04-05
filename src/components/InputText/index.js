import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, TextInput } from 'react-native';

import styles from './styles';

function Input({
  label,
  onChangeText,
  valueInput = 'default',
  keyboardType,
  placeHolder,
  maskType = null,
  reading = false,
  errorField = false,
}) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(valueInput);
  }, [valueInput]);

  const handleChangeValue = (text = '') => {
    switch (maskType) {
      case 'account': {
        const valueClean = text.replace('-', '');
        const lengthValue = valueClean.length;

        if (lengthValue < 4) {
          onChangeText(valueClean);
        } else {
          const newValue = `${valueClean.substring(
            0,
            lengthValue - 1,
          )}-${valueClean.substring(lengthValue - 1, lengthValue)}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'cpf': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 4) {
          onChangeText(valueClean);
        } else if (lengthValue < 7) {
          const newValue = `${valueClean.substring(
            0,
            3,
          )}.${valueClean.substring(3, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 10) {
          const newValue = `${valueClean.substring(
            0,
            3,
          )}.${valueClean.substring(3, 6)}.${valueClean.substring(
            6,
            lengthValue,
          )}`;
          onChangeText(newValue);
        } else {
          const newValue = `${valueClean.substring(
            0,
            3,
          )}.${valueClean.substring(3, 6)}.${valueClean.substring(
            6,
            9,
          )}-${valueClean.substring(9, lengthValue < 12 ? lengthValue : 11)}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'date': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 3) {
          onChangeText(valueClean);
        } else if (lengthValue < 5) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}/${valueClean.substring(2, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 9) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}/${valueClean.substring(2, 4)}/${valueClean.substring(
            4,
            lengthValue,
          )}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'cnpj': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 3) {
          onChangeText(valueClean);
        } else if (lengthValue < 6) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 9) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, 5)}.${valueClean.substring(
            5,
            lengthValue,
          )}`;
          onChangeText(newValue);
        } else if (lengthValue < 13) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, 5)}.${valueClean.substring(
            5,
            8,
          )}/${valueClean.substring(8, lengthValue)}`;
          onChangeText(newValue);
        } else {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, 5)}.${valueClean.substring(
            5,
            8,
          )}/${valueClean.substring(8, 12)}-${valueClean.substring(
            12,
            lengthValue < 15 ? lengthValue : 14,
          )}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'phone': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 1) {
          onChangeText(``);
        } else if (lengthValue < 3) {
          onChangeText(`(${valueClean}`);
        } else if (lengthValue < 7) {
          const newValue = `(${valueClean.substring(
            0,
            2,
          )}) ${valueClean.substring(2, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 11) {
          const newValue = `(${valueClean.substring(
            0,
            2,
          )}) ${valueClean.substring(2, 6)}-${valueClean.substring(
            6,
            lengthValue,
          )}`;
          onChangeText(newValue);
        } else if (lengthValue < 12) {
          const newValue = `(${valueClean.substring(
            0,
            2,
          )}) ${valueClean.substring(2, 7)}-${valueClean.substring(
            7,
            lengthValue,
          )}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'cep': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 3) {
          onChangeText(valueClean);
        } else if (lengthValue < 6) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 9) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}.${valueClean.substring(2, 5)}-${valueClean.substring(
            5,
            lengthValue,
          )}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'cardCredit': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 5) {
          onChangeText(valueClean);
        } else if (lengthValue < 9) {
          const newValue = `${valueClean.substring(
            0,
            4,
          )} ${valueClean.substring(4, lengthValue)}`;
          onChangeText(newValue);
        } else if (lengthValue < 13) {
          const newValue = `${valueClean.substring(
            0,
            4,
          )} ${valueClean.substring(4, 8)} ${valueClean.substring(
            8,
            lengthValue,
          )}`;
          onChangeText(newValue);
        } else if (lengthValue < 17) {
          const newValue = `${valueClean.substring(
            0,
            4,
          )} ${valueClean.substring(4, 8)} ${valueClean.substring(
            8,
            12,
          )} ${valueClean.substring(12, lengthValue)}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'validateCard': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 3) {
          onChangeText(valueClean);
        } else if (lengthValue < 5) {
          const newValue = `${valueClean.substring(
            0,
            2,
          )}/${valueClean.substring(2, lengthValue)}`;
          onChangeText(newValue);
        }
        break;
      }
      case 'codeCard': {
        const valueClean = String(text).replace(/[^\d]/g, '');
        const lengthValue = valueClean.length;
        if (lengthValue < 5) {
          onChangeText(valueClean);
        }
        break;
      }
      default:
        onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.contentLabel}>
          <Text
            style={[
              styles.textLabel,
              isFocused || value !== ''
                ? { color: '#007f0b' }
                : { color: '#B3B3B3' },
              errorField && { color: '#F00E0E' },
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
        <TextInput
          style={styles.inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeValue}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          placeholderTextColor="#B7B7B7"
          value={value}
          editable={!reading}
        />
      </View>
    </View>
  );
}

export default Input;
