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

const SimpleBouncingArrow = () => {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(15, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.arrowContainer, animatedStyle]}>
      <Svg width="40" height="60" viewBox="0 0 40 60">
        <Defs>
          <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="0.3"
            />
            <Stop
              offset="100%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        {/* Arrow Line */}
        <Path
          d="M 20 10 L 20 45"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow Head */}
        <Path
          d="M 20 45 L 15 40 M 20 45 L 25 40"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
};

export default SimpleBouncingArrow;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 10,
  },
});
