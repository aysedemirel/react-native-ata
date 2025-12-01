import URLS from '@/src/constants/Urls';
import Colors from '@/src/themes/colors';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import uuid from 'react-native-uuid';

const BoldifyText = (
  inputText: string,
  color: string,
  controlTxt: string,
  fontSize: number,
) => {
  const parts = inputText.split(/'([^']+)'/);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <Pressable
        key={uuid.v4().toString()}
        onPress={() => {
          const url = part === controlTxt ? URLS.terms : URLS.privacyPolicy;
          Linking.openURL(url);
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={[styles.boldTxt, { fontSize: fontSize }]}>{part}</Text>
      </Pressable>
    ) : (
      <Text key={uuid.v4().toString()} style={{ color }}>
        {part}
      </Text>
    ),
  );
};

export default BoldifyText;

const styles = StyleSheet.create({
  boldTxt: {
    color: Colors.info,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
