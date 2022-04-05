import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

function Select({
  label,
  valueInput,
  changeValue,
  placeHolder,
  options = [],
  errorField = false,
  loading = false,
  handleClose = null,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);

  const messageDisplay = useCallback(() => {
    if (loading) {
      return 'carregando...';
    }

    return valueInput ? valueInput.label : placeHolder;
  }, [placeHolder, valueInput, loading]);

  const handleSelectItem = useCallback(
    option => {
      if (changeValue) {
        changeValue(option);
      }
      setOptionSelected(option);
    },
    [changeValue],
  );

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.contentLabel}>
          <Text
            style={[
              styles.textLabel,
              valueInput && { color: '#007F0B' },
              errorField && { color: '#F00E0E' },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.contentInput}
        onPress={() => {
          if (!loading) {
            setIsOpenModal(true);
          }
        }}
      >
        <Text
          style={[styles.inputValue, !valueInput ? { color: '#B7B7B7' } : {}]}
        >
          {messageDisplay()}
        </Text>
        <Icon name="caret-down" size={26} color="#000000" />
      </TouchableOpacity>
      <Modal isVisible={isOpenModal}>
        <View style={styles.containerModal}>
          <View style={styles.listagemModal}>
            <Text style={styles.textTitleModal}>{`${label}: `}</Text>
            <ScrollView style={styles.scrollModal}>
              <View style={styles.containerOptions}>
                {options.length > 0 &&
                  options.map(option => (
                    <TouchableOpacity
                      onPress={() => handleSelectItem(option)}
                      key={option.value}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <RadioButton
                        value={option.label}
                        color="#477E22"
                        status={
                          valueInput && valueInput.value === option.value
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => handleSelectItem(option)}
                      />
                      <Text style={styles.textModal}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.containerFooterModal}>
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                handleSelectItem(null);
                setIsOpenModal(false);
              }}
            >
              <Text style={styles.textButtonFooterModal}>LIMPAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                if (handleClose) {
                  handleClose(optionSelected);
                }
                setIsOpenModal(false);
              }}
            >
              <Text style={styles.textButtonFooterModal}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Select;
