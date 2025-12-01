import DefaultView from '@/src/components/view/DefaultView';
import { normalizeFont, wp } from '@/src/constants/layout';
import { fonts, fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import { isNullOrWhitespace } from '@/src/utils/stringExtensions';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  placeholderText: string;
  value: string;
  isEnabled?: boolean;
  isSecret?: boolean;
  setValue: (val: string) => void;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
}
const TextInputWithIcon = ({
  iconName,
  value,
  placeholderText,
  setValue,
  isEnabled = true,
  onBlur,
  keyboardType,
  isSecret = false,
  style,
}: Props) => {
  const { theme } = useTheme();
  const [isPasswordHide, setIsPasswordHide] = useState<boolean>(true);
  const [borderColor, setBorderColor] = useState<string>(theme.error);

  useEffect(() => {
    setBorderColor(isNullOrWhitespace(value) ? theme.error : theme.border);
  }, [theme.border, theme.error, value]);

  const handleChange = (text: string) => {
    setBorderColor(isNullOrWhitespace(text) ? theme.error : theme.border);
    setValue(text);
  };

  return (
    <DefaultView style={{ ...styles.container, ...style }}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={iconName}
          size={normalizeFont(20)}
          color={isEnabled ? theme.icon : theme.passive}
        />
      </View>
      <TextInput
        style={[
          styles.border,
          styles.textInput,
          {
            borderColor: isEnabled ? borderColor : theme.passive,
            color: isEnabled ? theme.text : theme.passive,
            backgroundColor: theme.item,
          },
        ]}
        placeholderTextColor={theme.passive}
        defaultValue={value}
        onChangeText={handleChange}
        onBlur={onBlur}
        keyboardType={keyboardType}
        placeholder={placeholderText}
        editable={isEnabled}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isSecret && isPasswordHide}
      />
      {isSecret && (
        <Pressable
          style={({ pressed }) => [
            {
              transform: [
                {
                  scale: pressed ? 1.05 : 1,
                },
              ],
            },
            styles.eyeContainer,
          ]}
          onPress={() => {
            setIsPasswordHide((prev) => !prev);
          }}
        >
          <Ionicons
            name={isPasswordHide ? 'eye-outline' : 'eye-sharp'}
            size={normalizeFont(20)}
            color={theme.transparency}
          />
        </Pressable>
      )}
    </DefaultView>
  );
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  border: {
    borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
  },
  container: {
    flex: 1,
  },
  eyeContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(2),
    width: '10%',
    zIndex: 50,
  },
  iconContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    left: wp(5),
    position: 'absolute',
    zIndex: 1,
  },
  textInput: {
    borderRadius: 10,
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    justifyContent: 'flex-end',
    paddingLeft: wp(15),
  },
});
