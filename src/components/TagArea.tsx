import { hp, normalizeFont, wp } from '@/src/constants/layout';
import { fontSizes } from '@/src/constants/Styles';
import { useTheme } from '@/src/providers/ThemeProvider';
import Colors from '@/src/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tag } from '../interfaces/tags';
import RegularText from './RegularText';

interface Props {
  selectedTags: Tag[];
  onPress: () => void;
}

const SHOWN_MAX_TAG = 3;

const TagArea = ({ selectedTags, onPress }: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: theme.item }]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="tag-multiple"
          size={normalizeFont(15)}
          color={theme.text}
        />
        <RegularText style={styles.title} isTransparentBackg text={t('tags')} />
      </View>
      <View style={styles.tagsContainer}>
        {selectedTags.length === 0 ? (
          <RegularText isSmall isTransparentBackg text={t('add-new-tag')} />
        ) : (
          selectedTags.slice(0, SHOWN_MAX_TAG).map((tag) => (
            <View
              key={tag.id}
              style={[styles.tag, { backgroundColor: tag.color }]}
            >
              <Text
                style={[styles.tagText, { color: Colors.light }]}
                numberOfLines={1}
              >
                {t(tag.name)}
              </Text>
            </View>
          ))
        )}
        {selectedTags.length > SHOWN_MAX_TAG && (
          <View style={[styles.tag, { backgroundColor: theme.tertiary }]}>
            <Text style={[styles.tagText, { color: theme.text }]}>
              +{selectedTags.length - SHOWN_MAX_TAG}
            </Text>
          </View>
        )}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={normalizeFont(15)}
        color={theme.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  tag: {
    borderRadius: 12,
    marginBottom: hp(0.5),
    marginLeft: wp(1),
    maxWidth: wp(18),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
  },
  tagText: {
    fontSize: fontSizes.smaller,
    fontWeight: '500',
    textAlign: 'center',
  },
  tagsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 3,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: fontSizes.small,
    marginLeft: wp(2),
  },
});

export default TagArea;
