import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { hp } from '../../constants/layout';
import { useTheme } from '../../providers/ThemeProvider';

const PulsingArrow = () => {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Up and down movement
    translateY.value = withRepeat(
      withSequence(
        withTiming(15, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );

    // Pulse
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 400 }),
      ),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.arrowContainer, animatedStyle]}>
      <Svg width="40" height="60" viewBox="0 0 40 60">
        <Defs>
          <LinearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="0.4"
            />
            <Stop
              offset="100%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Path
          d="M 20 10 L 20 45"
          stroke="url(#gradient4)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 20 45 L 14 39 M 20 45 L 26 39"
          stroke="url(#gradient4)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
};

export default PulsingArrow;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    zIndex: 10,
  },
});
