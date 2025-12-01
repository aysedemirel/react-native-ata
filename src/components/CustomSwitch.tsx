import { hp, normalizeFont } from '@/src/constants/layout';
import { useTheme } from '@/src/providers/ThemeProvider';
import Colors from '@/src/themes/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Switch, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CustomSwitchProps {
  isEnabled: boolean;
  enabledIcon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  disabledIcon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  isMaterialIcon?: boolean;
  toggleSwitch: () => void;
  trackColor1?: string;
  trackColor2?: string;
  style?: ViewStyle;
}

const CustomSwitch = ({
  isEnabled,
  enabledIcon,
  disabledIcon,
  toggleSwitch,
  trackColor1,
  trackColor2,
  isMaterialIcon = false,
  style,
}: CustomSwitchProps) => {
  const { theme } = useTheme();
  const position = useSharedValue(0);

  useEffect(() => {
    position.value = withTiming(isEnabled ? 1 : 0, { duration: 200 });
  }, [isEnabled, position]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      position.value,
      [0, 1],
      [-2, Platform.OS === 'ios' ? 24 : 29],
    );

    return {
      transform: [{ translateX }, { scale: 1.2 }],
    };
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{
            false: trackColor1 || theme.passive,
            true: trackColor2 || theme.secondary,
          }}
          thumbColor={theme.thumb}
          ios_backgroundColor={trackColor1 || theme.passive}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={[
            styles.switch,
            Platform.OS !== 'ios' && {
              transform: [{ scaleX: 1.6 }, { scaleY: 1.4 }],
            },
          ]}
        />
        <Animated.View
          style={[
            isEnabled ? styles.iconContainerRight : styles.iconContainerLeft,
            animatedStyle,
            Platform.OS !== 'ios' && [
              styles.androidSwitch,
              {
                backgroundColor: isEnabled
                  ? trackColor2 || theme.tertiary
                  : trackColor1 || theme.border,
              },
            ],
          ]}
          pointerEvents="none"
        >
          {!isMaterialIcon ? (
            <Ionicons
              name={
                isEnabled
                  ? (enabledIcon as keyof typeof Ionicons.glyphMap)
                  : (disabledIcon as keyof typeof Ionicons.glyphMap)
              }
              size={normalizeFont(15)}
              color={(() => {
                if (Platform.OS === 'ios') {
                  return isEnabled
                    ? trackColor2 || theme.secondary
                    : Colors.grey;
                }
                if (isEnabled) return theme.item;
                return trackColor2 !== null ? theme.tertiary : theme.passive;
              })()}
              style={styles.icon}
            />
          ) : (
            <MaterialCommunityIcons
              name={
                isEnabled
                  ? (enabledIcon as keyof typeof MaterialCommunityIcons.glyphMap)
                  : (disabledIcon as keyof typeof MaterialCommunityIcons.glyphMap)
              }
              size={normalizeFont(20)}
              color={(() => {
                if (Platform.OS === 'ios') {
                  return isEnabled
                    ? trackColor2 || theme.secondary
                    : Colors.grey;
                }
                if (isEnabled) return theme.item;
                return trackColor2 !== null ? theme.tertiary : theme.passive;
              })()}
              style={styles.icon}
            />
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  androidSwitch: {
    borderRadius: 50,
    padding: 2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { padding: Platform.OS === 'ios' ? 0 : normalizeFont(4) },
  iconContainerLeft: {
    left: Platform.OS === 'ios' ? 6 : normalizeFont(2),
    position: 'absolute',
    top: normalizeFont(4),
    zIndex: 1,
  },
  iconContainerRight: {
    left: normalizeFont(4),
    position: 'absolute',
    top: normalizeFont(4),
    zIndex: 1,
  },
  switch: {
    ...Platform.select({
      android: {
        paddingTop: hp(1),
      },
    }),
  },
  switchContainer: {
    height: 32,
    position: 'relative',
    width: 52,
  },
});

export default CustomSwitch;
