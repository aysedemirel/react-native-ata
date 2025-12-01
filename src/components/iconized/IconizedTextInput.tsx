import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { fonts, fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import Colors from '@/src/themes/colors';
import { isNullOrWhitespace } from '@/src/utils/stringExtensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import RegularText from '../RegularText';

interface Props {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  defaultValue: string;
  onChangeText: (txt: string) => void;
  setIsError: (value: boolean) => void;
  placeholder?: string;
  keyboardType?: 'numeric' | 'default';
  editable?: boolean;
  isEnabled?: boolean;
  style?: ViewStyle;
}

const characterLimit = 100;

const IconizedTextInput = ({
  title,
  iconName,
  defaultValue,
  placeholder,
  onChangeText,
  setIsError,
  keyboardType = 'default',
  editable = true,
  isEnabled = true,
  style,
}: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [borderColor, setBorderColor] = useState<string>(
    isNullOrWhitespace(defaultValue) ? theme.error : theme.border,
  );

  const validateInput = (input: string): boolean => {
    if (!input.trim()) {
      setError(t('fill-out-this-field'));
      setBorderColor(theme.error);
      return false;
    }
    setBorderColor(theme.border);
    setError(null);
    return true;
  };

  const handleChange = (text: string) => {
    onChangeText(text);
    setInputValue(text);
    const isValidated = validateInput(text);
    setIsError(!isValidated);
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
          text={title}
          isSmall
          style={{
            color: isEnabled ? theme.text : theme.passive,
          }}
        />
      </View>
      <TextInput
        style={[
          styles.regularTxt,
          styles.txtInput,
          {
            backgroundColor: theme.item,
            borderColor: isEnabled ? borderColor : theme.passive,
            color: editable && isEnabled ? theme.text : theme.passive,
          },
        ]}
        maxLength={characterLimit}
        multiline
        numberOfLines={2}
        defaultValue={inputValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={theme.passive}
        editable={editable && isEnabled}
        onChangeText={handleChange}
        returnKeyType="done"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default IconizedTextInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
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
  regularTxt: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  txtInput: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
    paddingLeft: wp(4),
    paddingVertical: hp(2),
  },
});
