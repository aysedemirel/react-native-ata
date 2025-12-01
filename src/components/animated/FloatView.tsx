import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface FloatViewProps extends PropsWithChildren {
  distance?: number; // Movement distance (default: 10)
  duration?: number; // Animation duration (default: 2000ms)
}

export const FloatView = ({
  children,
  distance = 10,
  duration = 2000,
}: FloatViewProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-distance, {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1, // -1 means infinite loop
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default FloatView;
