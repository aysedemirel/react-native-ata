/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { fontSizes } from '../../constants/Styles';

export const CounterWithContinuousConfetti = () => {
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
      withSpring(1.3, { damping: 3 }),
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
          <ContinuousConfetti />
        </View>
      )}
    </View>
  );
};

const ContinuousConfetti = () => {
  const [waves, setWaves] = useState([0]);
  const MAX_WAVES = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setWaves((prev) => {
        const newWave = prev.length;
        const updatedWaves = [...prev, newWave];
        return updatedWaves.length > MAX_WAVES
          ? updatedWaves.slice(-MAX_WAVES)
          : updatedWaves;
      });
    }, 2500); // New wave every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ffd89b'];

  return (
    <View style={styles.effectContainer}>
      {waves.map((waveIndex) => (
        <View key={waveIndex}>
          {Array.from({ length: 20 }, (_, i) => (
            <ConfettiPiece
              key={`${waveIndex}-${i}`}
              color={colors[i % colors.length]}
              delay={i * 50}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const ConfettiPiece = ({ color, delay }: { color: string; delay: number }) => {
  const translateY = useSharedValue(-70);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomRotation = Math.random() * 720;

    // Run all animations in parallel with delays
    translateY.value = withDelay(delay, withTiming(400, { duration: 2000 }));
    translateX.value = withDelay(
      delay,
      withTiming(randomX, { duration: 2000 }),
    );
    rotate.value = withDelay(
      delay,
      withTiming(randomRotation, { duration: 2000 }),
    );
    opacity.value = withDelay(delay, withTiming(0, { duration: 2000 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.confettiPiece, animatedStyle]} />;
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
  confettiPiece: {
    borderRadius: 2,
    height: 10,
    position: 'absolute',
    width: 10,
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
});
