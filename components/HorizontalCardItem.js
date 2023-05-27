import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const HorizontalCardItem = ({id, imageUrl, title, type}) => {
  const navigation = useNavigation();
  const onCardItemHandler = () => {
    navigation.navigate('Media', {
      mediaId: id,
      mediaType: type,
    });
  };

  return (
    <TouchableOpacity
      onPress={onCardItemHandler}
      style={styles.cardItemContainerStyle}
      activeOpacity={0.7}>
      <Image source={{uri: imageUrl}} style={{height: 135, width: 135}} />
      <Text style={{color: '#fff'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HorizontalCardItem;

const styles = StyleSheet.create({
  cardItemContainerStyle: {
    marginRight: 10,
    width: 145,
    marginLeft: 10,
  },
});
