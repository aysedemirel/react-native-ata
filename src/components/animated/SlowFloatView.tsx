import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const SlowFloatView = ({ children }: PropsWithChildren) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-15, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin), // More natural with sin easing
        }),
        withTiming(0, {
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
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
