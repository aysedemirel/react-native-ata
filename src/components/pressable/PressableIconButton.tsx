import { normalizeFont } from '@/src/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from '../Icon';

interface Props {
  onPress?: () => void;
  onPressEvent?: (e: GestureResponderEvent) => void;
  iconSize: number;
  iconName: keyof typeof Ionicons.glyphMap;
  disabledIconName?: keyof typeof Ionicons.glyphMap;
  style?: object;
  iconColor?: string;
  disabled?: boolean;
  ref?: React.RefObject<View | null>;
}

const PressableIonIconsButton = ({
  onPress,
  onPressEvent,
  iconName,
  disabledIconName,
  iconSize,
  iconColor,
  style,
  disabled = false,
  ref,
}: Props) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(1.1, {
      stiffness: 400,
      damping: 10,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      stiffness: 400,
      damping: 10,
    });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (onPressEvent) onPressEvent(e);
    if (onPress) onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      ref={ref}
      disabled={disabled}
    >
      <Animated.View style={[animatedStyle, style]}>
        <Icon
          isEnabled={!disabled}
          iconNameEnabled={iconName}
          iconNameDisabled={disabledIconName || iconName}
          size={normalizeFont(iconSize)}
          iconColor={iconColor}
        />
      </Animated.View>
    </Pressable>
  );
};

export default PressableIonIconsButton;
