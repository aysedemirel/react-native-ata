import { hp, wp } from '@/src/constants/layout';
import { fontSizes } from '@/src/constants/Styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, ViewStyle } from 'react-native';
import PressableText from './pressable/PressableText';
import RegularText from './RegularText';

interface Props {
  style?: ViewStyle;
  emoji: string;
  isTitleActive: boolean;
  openEmojiArea: (value: boolean) => void;
}
const EmojiArea = React.memo(
  ({ openEmojiArea, emoji, style = {}, isTitleActive }: Props) => {
    const { t } = useTranslation();

    const handleOpenEmoji = () => {
      openEmojiArea(true);
    };

    return (
      <View style={[styles.container, style]}>
        {isTitleActive && (
          <RegularText isSmall text={t('symbol')} style={styles.text} />
        )}
        <PressableText
          text={emoji}
          onPress={handleOpenEmoji}
          style={styles.emojiArea}
          fontSize={fontSizes.title}
        />
      </View>
    );
  },
);

EmojiArea.displayName = 'EmojiArea';

export default EmojiArea;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiArea: {
    borderRadius: 100,
    height: hp(7),
    width: wp(15),
  },
  text: { paddingBottom: hp(1) },
});
