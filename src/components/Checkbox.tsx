import BoldifyText from '@/src/components/view/BoldifyText';
import { normalizeFont, wp } from '@/src/constants/layout';
import { useTheme } from '@/src/providers/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import {
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';

interface Props {
  text: string;
  size: number;
  onPress: () => void;
}

const Checkbox = ({ text, size, onPress }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handlePress = () => {
    setIsChecked((prev) => !prev);
    onPress();
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            transform: [
              {
                scale: pressed ? 1.15 : 1,
              },
            ],
            marginLeft: wp(5),
          },
        ]}
        onPress={handlePress}
      >
        <MaterialIcons
          name={isChecked ? 'check-box' : 'check-box-outline-blank'}
          size={normalizeFont(size)}
          color={theme.icon}
        />
      </Pressable>
      <Text style={styles.txt}>
        {BoldifyText(text, theme.text, t('terms-and-conditions'), 14)}
      </Text>
    </GestureHandlerRootView>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: wp(2),
  },
  txt: {
    paddingLeft: wp(2),
    paddingRight: wp(5),
  },
});
