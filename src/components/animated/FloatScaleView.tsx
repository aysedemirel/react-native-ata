import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export const FloatScaleView = ({ children }: PropsWithChildren) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Float
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );

    // Scale
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
