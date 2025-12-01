/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { hp } from '../../constants/layout';
import { useTheme } from '../../providers/ThemeProvider';

const DottedTrailArrow = () => {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);
  const dot1Opacity = useSharedValue(0);
  const dot2Opacity = useSharedValue(0);
  const dot3Opacity = useSharedValue(0);

  useEffect(() => {
    // Main arrow animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(20, {
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );

    // Dot animations - staggered effect
    dot1Opacity.value = withRepeat(
      withSequence(
        withDelay(0, withTiming(1, { duration: 300 })),
        withDelay(600, withTiming(0, { duration: 400 })),
      ),
      -1,
      false,
    );

    dot2Opacity.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(1, { duration: 300 })),
        withDelay(400, withTiming(0, { duration: 400 })),
      ),
      -1,
      false,
    );

    dot3Opacity.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(1, { duration: 300 })),
        withDelay(200, withTiming(0, { duration: 400 })),
      ),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }));

  const primaryColor = theme.primary || '#667eea';

  return (
    <Animated.View style={[styles.arrowContainer, arrowStyle]}>
      <Svg width="40" height="80" viewBox="0 0 40 80">
        {/* arrow */}
        <Path
          d="M 20 10 L 20 55"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 20 55 L 15 50 M 20 55 L 25 50"
          stroke={primaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      <Animated.View style={[styles.dot, dot1Style, { top: 15 }]}>
        <View style={[styles.dotInner, { backgroundColor: primaryColor }]} />
      </Animated.View>
      <Animated.View style={[styles.dot, dot2Style, { top: 30 }]}>
        <View style={[styles.dotInner, { backgroundColor: primaryColor }]} />
      </Animated.View>
      <Animated.View style={[styles.dot, dot3Style, { top: 45 }]}>
        <View style={[styles.dotInner, { backgroundColor: primaryColor }]} />
      </Animated.View>
    </Animated.View>
  );
};

export default DottedTrailArrow;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 10,
  },
  dot: {
    left: '50%',
    marginLeft: -4,
    position: 'absolute',
  },
  dotInner: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
});
