import { useTheme } from '@/src/providers/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { fonts, fontSizes } from '../constants/Styles';
import Colors from '../themes/colors';

interface Props extends TextProps {
  text: string;
  isTitle?: boolean;
  isSmall?: boolean;
  style?: TextStyle;
  isColored?: boolean;
  isBold?: boolean;
  isEnabled?: boolean;
  isAppTitle?: boolean;
  isPrimary?: boolean;
  isItem?: boolean;
  isHighlighted?: boolean;
  isLarge?: boolean;
  isPassive?: boolean;
  isTransparentBackg?: boolean;
}
const RegularText = ({
  text,
  style,
  isColored = false,
  isTitle = false,
  isBold = false,
  isEnabled = true,
  isSmall = false,
  isAppTitle = false,
  isPrimary = false,
  isItem = false,
  isHighlighted = false,
  isLarge = false,
  isPassive = false,
  isTransparentBackg = false,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        {
          backgroundColor: (() => {
            if (isTransparentBackg) return Colors.transparent;
            if (isItem) return theme.item;
            if (isColored) return theme.primary;
            if (isHighlighted) return theme.tertiary;
            return theme.background;
          })(),
          color: (() => {
            if (isColored) return theme.primaryText;
            if (isHighlighted) return theme.dark;
            if (isPrimary) return theme.primary;
            if (isPassive) return theme.tabIcon;
            if (isEnabled) return theme.text;
            return theme.passive;
          })(),
        },
        (() => {
          if (isAppTitle) return styles.appTitle;
          if (isTitle) return [styles.txtTitle, { textAlign: 'center' }];
          if (isSmall) return [styles.smallTxt];
          if (isBold) return styles.boldTxt;
          if (isLarge) return styles.txtLargeRegular;
          return styles.regularTxt;
        })(),
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default RegularText;

const styles = StyleSheet.create({
  appTitle: { fontFamily: fonts.title, fontSize: fontSizes.title },
  boldTxt: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.medium,
  },
  regularTxt: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  smallTxt: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
  },
  txtLargeRegular: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.large,
  },
  txtTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
  },
});
