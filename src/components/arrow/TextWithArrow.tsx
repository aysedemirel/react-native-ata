import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { useTheme } from '../../providers/ThemeProvider';
import { hp } from '../../constants/layout';

const TextWithArrow = ({ text = '👇' }: { text?: string }) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const translateAnimation = withSequence(
      withTiming(10, { duration: 600 }),
      withTiming(0, { duration: 600 }),
    );

    const opacityAnimation = withSequence(
      withTiming(0.3, { duration: 600 }),
      withTiming(1, { duration: 600 }),
    );

    translateY.value = withRepeat(translateAnimation, -1, false);
    opacity.value = withRepeat(opacityAnimation, -1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.arrowContainer, animatedStyle]}>
      <Animated.Text
        style={[styles.arrowText, { color: theme.primary || '#667eea' }]}
      >
        {text}
      </Animated.Text>
    </Animated.View>
  );
};

export default TextWithArrow;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 10,
  },
  arrowText: {
    fontSize: 48,
  },
});
