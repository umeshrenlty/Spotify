import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import {COLORS, FONTS, SIZES, icons} from '../constants';
import getCategory from '../Redux/actions/BrowseActions';
import {useDispatch, useSelector} from 'react-redux';
const Search = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.browseData.catData);
  console.log(state, 'serch');
  const [isUserSearching, setIsUserSearching] = useState(true);

  return (
    <View style={styles.searchScreen}>
      <Header />
      <Text style={styles.textStyle}>Search</Text>
      <View style={styles.searchContainer}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          // value={searchTerm}
          // onChangeText={searchTermHandler}
          placeholder="What do you want to listen to ?"
          selectionColor={COLORS.primary}
          placeholderTextColor={COLORS.white}
          style={styles.textInput}
        />
      </View>
      <View style={styles.footerContainer}>
        {isUserSearching ? (
          <FlatList
            data={state}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1}}>
                  <Image
                    source={{uri: item.icons[0]?.url}}
                    style={{
                      height: 150,
                      width: 150,
                      padding: 10,
                      margin: 20,
                      borderRadius: 50,
                    }}
                  />
                  <Text style={[styles.textStyle]}>{item.name}</Text>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchScreen: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#464d47',
    width: '100%',
  },
  searchContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: SIZES.paddingBottom,
  },
  textInput: {
    height: 60,
    flex: 1,
    marginLeft: 10,
    color: COLORS.white,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    letterSpacing: 2,
  },
  footerContainer: {},
  cardItemContainer: {
    backgroundColor: COLORS.lightGray3,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row-reverse',
  },
  cardItemImageContainer: {
    width: 30,
    position: 'relative',
    left: 50,
  },
  cardItemImage: {
    height: 135,
    width: 80,
    borderRadius: 20,
  },
  cardItemCategory: {
    width: 185,
    marginRight: 58,
    justifyContent: 'center',
  },
  categoryName: {
    color: COLORS.white,
    paddingBottom: 10,
    ...FONTS.h2,
  },
  searchIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  textStyle: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 2,
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
    paddingBottom: 15,
    paddingHorizontal: 24,
    fontWeight: 'bold',
  },
});
