import { wp } from '@/src/constants/layout';
import { fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import PressableIonIconsButton from './PressableIconButton';

interface Props {
  onPress: () => void;
  text: string;
  fontSize?: number;
  style?: ViewStyle;
  zoom?: number;
  isEditable: boolean;
  numOfLines?: number;
}
const PressableAutoSizeText = ({
  onPress = () => {},
  text,
  fontSize,
  style,
  zoom,
  isEditable,
  numOfLines = 5,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? zoom || 1.02 : 1,
            },
          ],
        },
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.titleContainer,
          isEditable && styles.editable && styles.border,
          { backgroundColor: theme.item, borderColor: theme.border },
        ]}
      >
        <AutoSizeText
          fontSize={fontSize || fontSizes.medium}
          mode={ResizeTextMode.max_lines}
          numberOfLines={numOfLines}
          style={[styles.nameAutoText, { color: theme.text }]}
        >
          {text}
        </AutoSizeText>
        {isEditable && (
          <PressableIonIconsButton
            iconName="create-outline"
            iconSize={20}
            onPress={onPress}
            style={styles.editBtn}
          />
        )}
      </View>
    </Pressable>
  );
};

export default PressableAutoSizeText;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
  },
  editBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editable: {
    borderRadius: 10,
  },
  nameAutoText: { maxWidth: '80%', paddingHorizontal: wp(2) },
  titleContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
});
