import RoboFont from '@/src/assets/fonts/Roboto-Bold.ttf';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Canvas, Text, useFont } from '@shopify/react-native-skia';
import React from 'react';
import { View } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

type Props = {
  isHighlighted?: boolean;
  selectedValue: SharedValue<number>;
};

const AnimatedText = ({ selectedValue, isHighlighted }: Props) => {
  const { theme } = useTheme();
  const font = useFont(RoboFont, 35);

  const animatedText = useDerivedValue(
    () => `${Math.round(selectedValue.value)}`,
  );

  if (!font) {
    return <View />;
  }

  const fontSize = font.measureText('0');

  return (
    <Canvas style={{ height: fontSize.height + 30 }}>
      <Text
        text={animatedText}
        font={font}
        color={isHighlighted ? theme.dark : theme.text}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
};

export default AnimatedText;
