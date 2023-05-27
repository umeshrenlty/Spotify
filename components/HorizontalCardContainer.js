import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import HorizontalCardItem from './HorizontalCardItem';

const HorizontalCardContainer = ({data, label}) => {
  return (
    <View>
      <Text style={styles.textStyle}>{label}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <HorizontalCardItem
            id={item.id}
            imageUrl={item?.images[0].url}
            title={item.name}
            type={item.type}
            item={item}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${item.name}-${index}`}
      />
    </View>
  );
};

export default HorizontalCardContainer;

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.white,
    paddingBottom: 15,
    paddingHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
});
