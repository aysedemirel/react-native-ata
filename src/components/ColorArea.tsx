import { hp, wp } from '@/src/constants/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, ViewStyle } from 'react-native';
import PressableComponent from './pressable/PressableComponent';
import RegularText from './RegularText';

interface Props {
  color: string;
  openColorArea: (value: boolean) => void;
  style?: ViewStyle;
}

const ColorArea = React.memo(({ openColorArea, color, style }: Props) => {
  const { t } = useTranslation();

  const handleColorSelection = () => {
    openColorArea(true);
  };

  return (
    <View style={[styles.container, style]}>
      <RegularText isSmall text={t('color')} style={styles.text} />
      <PressableComponent
        onPress={handleColorSelection}
        style={styles.colorArea}
        zoom={1.07}
      >
        <View style={[styles.colorCircle, { backgroundColor: color }]} />
      </PressableComponent>
    </View>
  );
});

ColorArea.displayName = 'ColorArea';

export default ColorArea;

const styles = StyleSheet.create({
  colorArea: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    height: hp(7),
    justifyContent: 'center',
    width: wp(15),
  },
  colorCircle: {
    borderRadius: 100,
    height: hp(7),
    width: wp(15),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: {
    alignItems: 'center',
    borderRadius: 100,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  text: { paddingBottom: hp(1) },
});
