import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { fontSizes } from '../../constants/Styles';

export const CounterWithFloatingStars = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <FloatingStars />
        </View>
      )}
    </View>
  );
};

const FloatingStars = () => {
  const [stars, setStars] = useState([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) => [...prev, prev.length]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.effectContainer}>
      {stars.map((starIndex) => (
        <FloatingStar key={starIndex} />
      ))}
    </View>
  );
};

const FloatingStar = () => {
  const translateY = useSharedValue(200);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  // Random horizontal position
  const randomX = (Math.random() - 0.5) * 200;

  useEffect(() => {
    // Run animations in parallel
    translateY.value = withTiming(-200, {
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
    });

    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(2000, withTiming(0, { duration: 500 })),
    );

    scale.value = withSpring(1, { damping: 3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: randomX },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.floatingStar, animatedStyle]}>
      ⭐
    </Animated.Text>
  );
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
  floatingStar: {
    fontSize: 28,
    position: 'absolute',
  },
});
