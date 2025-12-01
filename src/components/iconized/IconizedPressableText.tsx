import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { useTheme } from '@/src/providers/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import RegularText from '../RegularText';

interface Props {
  onPress: () => void;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  text: string;
  children?: ReactNode;
  isEnabled?: boolean;
  style?: ViewStyle;
}
const IconizedPressableText = ({
  onPress,
  title,
  iconName,
  text,
  children,
  isEnabled,
  style,
}: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={iconName}
          size={normalizeFont(15)}
          color={theme.icon}
        />
        <RegularText isSmall text={title} />
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            transform: [
              {
                scale: pressed ? 1.02 : 1,
              },
            ],
            borderColor: theme.border,
          },
          style,
        ]}
        disabled={!isEnabled}
      >
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.item,
              borderColor: theme.border,
            },
            style,
          ]}
        >
          <RegularText
            text={text}
            style={{
              ...styles.txt,
              color: isEnabled ? theme.text : theme.passive,
              backgroundColor: theme.item,
            }}
          />
          {children}
        </View>
      </Pressable>
    </View>
  );
};

export default IconizedPressableText;

const styles = StyleSheet.create({
  container: {},
  content: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(2),
    paddingVertical: hp(1),
  },
  icon: {
    paddingHorizontal: wp(2),
    textAlign: 'left',
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(1),
  },
  txt: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
});
