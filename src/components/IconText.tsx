import { normalizeFont, wp } from '@/src/constants/layout';
import Colors from '@/src/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface iconTextProps {
  text: string;
  isCheck: boolean;
  style?: ViewStyle;
}
const IconText = ({ text, isCheck, style }: iconTextProps) => (
  <View style={[styles.container, style]}>
    <Ionicons
      name="checkmark-circle"
      size={normalizeFont(20)}
      color={isCheck ? Colors.success : Colors.passive}
      style={styles.icon}
    />
    <Text style={{ color: isCheck ? Colors.success : Colors.passive }}>
      {text}
    </Text>
  </View>
);

export default IconText;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: { paddingRight: wp(2) },
});
