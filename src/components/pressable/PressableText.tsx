import React from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { fonts, fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';

interface Props {
  onPress: () => void;
  text: string;
  isButton?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  isEnabled?: boolean;
  isLock?: boolean;
}
const PressableText = ({
  onPress,
  text,
  style,
  textStyle,
  isButton = false,
  fontSize = fontSizes.medium,
  isEnabled = true,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        styles.border,
        {
          transform: [
            {
              scale: pressed ? 1.02 : 1,
            },
          ],
          borderColor: theme.border,
          backgroundColor: (() => {
            if (isButton) return theme.primary;
            return theme.item;
          })(),
        },
        isButton && [styles.shadow, { shadowColor: theme.shadow }],
        style,
      ]}
      disabled={!isEnabled}
    >
      <Text
        style={[
          styles.text,
          styles.regularTxt,
          {
            color: (() => {
              if (isButton) return theme.primaryText;
              if (isEnabled) return theme.text;
              return theme.passive;
            })(),
          },
          { fontSize },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PressableText;

const styles = StyleSheet.create({
  border: {
    borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
  },
  pressable: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  regularTxt: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    textAlign: 'center',
  },
});
