import React, { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  zoom?: number;
  ref?: React.RefObject<View | null>;
}

const PressableComponent = ({
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  style = {},
  disabled = false,
  zoom = 1.02,
  ref,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      ref={ref}
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? zoom || 1.02 : 1,
            },
          ],
          borderColor: theme.border,
        },
        style,
      ]}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
};

export default PressableComponent;
