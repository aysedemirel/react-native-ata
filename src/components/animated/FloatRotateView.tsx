import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const FloatRotateView = ({ children }: PropsWithChildren) => {
  const translateY = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  useEffect(() => {
    // Float animation
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

    // Rotate animation
    rotateValue.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(-1, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateDeg = interpolate(rotateValue.value, [-1, 0, 1], [-5, 0, 5]);
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotateDeg}deg` },
      ],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
