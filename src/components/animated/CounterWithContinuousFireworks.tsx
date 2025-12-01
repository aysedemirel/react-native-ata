/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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

export const CounterWithContinuousFireworks = () => {
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
      withSpring(1.4, { damping: 2 }),
      withSpring(1, { damping: 3 }),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Animated.Text style={[styles.counterNumber, animatedStyle]}>
          {count}
        </Animated.Text>
      </View>

      {isComplete && (
        <View style={styles.celebrationContainer}>
          <ContinuousFireworks />
        </View>
      )}
    </View>
  );
};

const ContinuousFireworks = () => {
  const [fireworks, setFireworks] = useState([0]);
  const MAX_FIREWORKS = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setFireworks((prev) => {
        const newFirework = prev.length;
        const updatedFireworks = [...prev, newFirework];
        return updatedFireworks.length > MAX_FIREWORKS
          ? updatedFireworks.slice(-MAX_FIREWORKS)
          : updatedFireworks;
      });
    }, 1500); // New fireworks every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.effectContainer}>
      {fireworks.map((fw) => (
        <Firework key={fw} delay={0} />
      ))}
    </View>
  );
};

const Firework = ({ delay }: { delay: number }) => {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  return (
    <View style={styles.fireworkContainer}>
      {particles.map((index) => {
        const angle = (index * 360) / particles.length;
        return (
          <FireworkParticle
            key={index}
            angle={angle}
            color={colors[index % colors.length]}
            delay={delay}
          />
        );
      })}
    </View>
  );
};

const FireworkParticle = ({
  angle,
  color,
  delay,
}: {
  angle: number;
  color: string;
  delay: number;
}) => {
  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const distance = 80;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * distance;
    const y = Math.sin(rad) * distance;

    // Run all animations in parallel with delays
    scale.value = withDelay(delay, withTiming(1, { duration: 100 }));
    translateX.value = withDelay(delay, withTiming(x, { duration: 800 }));
    translateY.value = withDelay(delay, withTiming(y, { duration: 800 }));
    opacity.value = withDelay(delay + 400, withTiming(0, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.fireworkParticle, animatedStyle]} />;
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
  fireworkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireworkParticle: {
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    width: 8,
  },
});
