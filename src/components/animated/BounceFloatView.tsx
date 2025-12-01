import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const BounceFloatView = ({ children }: PropsWithChildren) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-12, {
          duration: 1500,
          easing: Easing.out(Easing.cubic), // Bounce effect
        }),
        withTiming(0, {
          duration: 1500,
          easing: Easing.bounce, // Jumping while returning
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
