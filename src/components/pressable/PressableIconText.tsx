import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { fonts, fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  children?: ReactNode;
  onPress?: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  text: string;
  zoom?: number;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  pressableStyle?: ViewStyle;
  isButton?: boolean;
  isEnabled?: boolean;
  isTransparent?: boolean;
}
const PressableIconText = ({
  onPress,
  iconName,
  iconColor,
  text,
  children,
  zoom,
  style,
  textStyle,
  pressableStyle,
  isButton = false,
  isEnabled = true,
  isTransparent = false,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? zoom || 1.02 : 1,
            },
          ],
          paddingHorizontal: wp(1),
        },
        pressableStyle,
      ]}
    >
      <View
        style={[
          styles.row,
          styles.border,
          {
            backgroundColor: (() => {
              if (isTransparent) return theme.background;
              if (isButton) return theme.primary;
              return theme.item;
            })(),
            borderColor: theme.border,
          },
          style,
        ]}
      >
        <Ionicons
          style={styles.icon}
          name={iconName}
          size={normalizeFont(fontSizes.medium3)}
          color={iconColor || (isButton ? theme.primaryText : theme.icon)}
        />
        <Text
          style={[
            styles.regularTxt,
            {
              color: (() => {
                if (!isEnabled) return theme.passive;
                if (isButton) return theme.primaryText;
                return theme.text;
              })(),
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
        {children}
      </View>
    </Pressable>
  );
};

export default PressableIconText;

const styles = StyleSheet.create({
  border: {
    borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
  },
  icon: {
    paddingHorizontal: wp(2),
  },
  regularTxt: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
  },
  row: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: hp(1),
    paddingVertical: hp(2),
  },
});
