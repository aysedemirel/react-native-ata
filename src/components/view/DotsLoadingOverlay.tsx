import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../providers/ThemeProvider';

const DotsLoadingOverlay = () => {
  const { theme } = useTheme();
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const createAnimation = (delay: number) =>
      withRepeat(
        withSequence(
          withDelay(
            delay,
            withTiming(-10, {
              duration: 400,
            }),
          ),
          withTiming(0, {
            duration: 400,
          }),
        ),
        -1,
        false,
      );

    dot1.value = createAnimation(0);
    dot2.value = createAnimation(200);
    dot3.value = createAnimation(400);
  }, [dot1, dot2, dot3]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  return (
    <View style={styles.overlay}>
      <View style={[styles.dotsContainer, { backgroundColor: theme.tertiary }]}>
        <View style={styles.dotsWrapper}>
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: theme.primary,
              },
              dot1Style,
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: theme.primary,
              },
              dot2Style,
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: theme.primary,
              },
              dot3Style,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default DotsLoadingOverlay;

const styles = StyleSheet.create({
  dot: {
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  dotsContainer: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 12,
    minWidth: 200,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  dotsWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  overlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
});
