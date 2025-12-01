/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { fontSizes } from '../../constants/Styles';

export const CounterWithContinuousRings = () => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 99) {
            setIsComplete(true);
            triggerCelebration();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isComplete]);

  const triggerCelebration = () => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 3 }),
      withSpring(1, { damping: 3 }),
    );
  };

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Animated.Text style={[styles.counterNumber, scaleStyle]}>
          {count}
        </Animated.Text>
      </View>

      {isComplete && (
        <View style={styles.celebrationContainer}>
          <ContinuousRings />
        </View>
      )}
    </View>
  );
};

const ContinuousRings = () => {
  const [rings, setRings] = useState([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRings((prev) => [...prev, prev.length]);
    }, 800); // New wave every 0.8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.effectContainer}>
      {rings.map((ringIndex) => (
        <PulseRing key={ringIndex} />
      ))}
    </View>
  );
};

const PulseRing = () => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    // Run animations in parallel
    scale.value = withTiming(2.5, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.pulseRing, animatedStyle]} />;
};

const styles = StyleSheet.create({
  celebrationContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  counterContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  counterNumber: {
    color: '#667eea',
    fontSize: fontSizes.larger,
    fontWeight: 'bold',
  },
  effectContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  pulseRing: {
    borderColor: '#667eea',
    borderRadius: 50,
    borderWidth: 3,
    height: 100,
    position: 'absolute',
    width: 100,
  },
});
