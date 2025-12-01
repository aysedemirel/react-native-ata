import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { useTheme } from '@/src/providers/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import PressableText from './pressable/PressableText';
import RegularText from './RegularText';

interface Props {
  setShow: (isShow: boolean) => void;
  baslik: string;
  value: Date;
  isEnabled: boolean;
  children?: ReactNode;
}

const TimeArea = ({ baslik, value, isEnabled, setShow, children }: Props) => {
  const { theme } = useTheme();

  const showTimepicker = () => {
    setShow(true);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  return (
    <View>
      <View style={styles.iconTitle}>
        <MaterialCommunityIcons
          name="clock-time-two"
          size={normalizeFont(15)}
          color={isEnabled ? theme.icon : theme.passive}
          style={styles.icon}
        />
        <RegularText
          isSmall
          text={baslik}
          style={{
            color: isEnabled ? theme.text : theme.passive,
          }}
        />
      </View>
      <View
        style={[
          styles.txtInput,
          {
            backgroundColor: theme.item,
          },
        ]}
      >
        <PressableText
          text={formatTime(value)}
          onPress={() => isEnabled && showTimepicker()}
          style={styles.textInput}
          textStyle={{
            color: isEnabled ? theme.text : theme.passive,
          }}
          isEnabled={isEnabled}
        />
        {children}
      </View>
    </View>
  );
};

export default TimeArea;

const styles = StyleSheet.create({
  icon: { paddingRight: wp(2) },
  iconTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    alignItems: 'flex-start',
    borderWidth: 0,
    flex: 1,
    width: '100%',
  },
  txtInput: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
    paddingLeft: wp(4),
    paddingVertical: hp(2),
  },
});
