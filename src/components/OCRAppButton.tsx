import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const OCRAppButton = ({text, onPress}: any) => (
  <TouchableOpacity style={styles.button} onPress={() => onPress()}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    opacity: 0.4,
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 20,
    paddingEnd: 20,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default OCRAppButton;
