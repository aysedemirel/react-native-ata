import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export const SubtleFloatView = ({ children }: PropsWithChildren) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-5, {
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 2500,
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
