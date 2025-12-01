import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import Colors from '@/src/themes/colors';
import { isNullOrWhitespace } from '@/src/utils/stringExtensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import CustomSwitch from '../CustomSwitch';
import RegularText from '../RegularText';

interface NumericInputProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  onChangeText: (value: string) => void;
  setIsError: (value: boolean) => void;
  setSwitchStatue?: () => void;
  isEnabled?: boolean;
  isSwitched?: boolean;
  isSwitchValue?: boolean;
  editable?: boolean;
  placeholder?: string;
  style?: ViewStyle;
}

const IconizedNumberInput: React.FC<NumericInputProps> = ({
  iconName,
  title,
  value,
  onChangeText,
  setIsError,
  setSwitchStatue,
  placeholder,
  isEnabled = true,
  editable = true,
  isSwitched = false,
  isSwitchValue = false,
  style,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const [borderColor, setBorderColor] = useState<string>(
    isNullOrWhitespace(value) ? theme.error : theme.border,
  );
  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(isSwitchValue);

  const validateInput = (input: string): boolean => {
    if (!input.trim()) {
      setError(t('fill-out-this-field'));
      setBorderColor(theme.error);
      return false;
    }
    const normalizedInput = input.replace(',', '.');
    const isValidNumber = /^-?\d*\.?\d*$/.test(normalizedInput);
    if (!isValidNumber) {
      setError(t('enter-valid-number'));
      setBorderColor(theme.error);
      return false;
    }
    setBorderColor(theme.border);
    setError(null);
    return true;
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    setInputValue(text);
    const isValidated = validateInput(text);
    setIsError(!isValidated);
  };

  const handleSwitch = () => {
    const switchValue = isSwitchActive;
    if (switchValue) {
      if (error) setInputValue('100');
      setIsError(false);
      setError(null);
    }
    setIsSwitchActive(!switchValue);
    if (setSwitchStatue) setSwitchStatue();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconTitle}>
        <MaterialCommunityIcons
          name={iconName}
          size={normalizeFont(15)}
          color={isEnabled ? theme.icon : theme.passive}
          style={styles.icon}
        />
        <RegularText
          isSmall
          text={title}
          style={{
            color: isEnabled ? theme.text : theme.passive,
          }}
        />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.item,
            borderColor: isEnabled ? borderColor : theme.passive,
            color: editable && isEnabled ? theme.text : theme.passive,
          },
        ]}
        value={inputValue}
        onChangeText={handleChangeText}
        editable={editable && isEnabled}
        placeholder={placeholder}
        placeholderTextColor={theme.passive}
        keyboardType="numeric"
        returnKeyType="done"
      />
      {isSwitched && (
        <CustomSwitch
          isEnabled={isSwitchActive}
          enabledIcon="rocket-sharp"
          disabledIcon="rocket-outline"
          toggleSwitch={handleSwitch}
          style={styles.switch}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
  },
  errorText: {
    color: Colors.error,
    fontSize: fontSizes.smaller,
  },
  icon: { paddingRight: wp(2) },
  iconTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    fontSize: fontSizes.medium,
    marginVertical: hp(1),
    paddingLeft: wp(4),
    paddingVertical: hp(2),
  },
  switch: {
    marginRight: wp(5),
    position: 'absolute',
    right: 0,
    top: '45%',
  },
});

export default IconizedNumberInput;
