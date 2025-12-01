import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from '../Icon';
import RegularText from '../RegularText';

interface Props {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
}
const IconizedPressable = ({ onPress, iconName, title, color }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Icon
          isEnabled
          iconNameEnabled={iconName}
          iconNameDisabled={iconName}
          size={normalizeFont(16)}
          style={styles.icon}
        />
        <RegularText isSmall text={title} />
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            transform: [
              {
                scale: pressed ? 1.07 : 1,
              },
            ],
          },
          styles.pressable,
          {
            backgroundColor: color || theme.item,
            borderColor: theme.border,
          },
        ]}
        onPress={onPress}
      />
    </View>
  );
};

export default IconizedPressable;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
  },
  icon: {
    marginRight: wp(1),
    textAlign: 'left',
    width: wp(5),
  },
  pressable: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    height: hp(7),
    justifyContent: 'center',
    width: wp(40),
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(1),
  },
});
