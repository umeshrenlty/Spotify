import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';

import {COLORS, FONTS, SIZES, icons} from '../constants';

import {useDispatch, useSelector} from 'react-redux';
import {getSearchResult} from '../Redux/actions/Search';
import SearchItem from '../components/searchItem';
const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const searchData = useSelector(state => state.SearchData);
  console.log(searchData, 2222);
  const state = useSelector(state => state.browseData.catData);
  // console.log(state, 'serch');
  const [isUserSearching, setIsUserSearching] = useState(false);
  //delay by 500 mili seconds
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getSearchResult(searchTerm));
    }
  }, [debouncedSearchTerm]);
  const searchTermHandler = input => {
    setSearchTerm(input);
    if (input.length > 0) setIsUserSearching(true);
    else setIsUserSearching(false);
  };
  const renderSearchResults = () => {
    if (searchData.isLoading)
      return <ActivityIndicator size="small" color="#0000ff" />;

    if (!searchData.results) {
      return (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h1}}>Couldn't find</Text>
          <Text
            style={{
              color: COLORS.white,
              marginBottom: SIZES.padding,
              fontFamily: 'Poppins-Bold',
              fontSize: 22,
              letterSpacing: 2,
            }}>
            "{searchTerm}"
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            Try searching again using a different spelling or keyword
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {searchData.results
          .filter(filteredItem => filteredItem.preview_url !== null)
          .map(item => {
            return (
              <SearchItem
                key={`${item.id}`}
                searchTerm={searchTerm}
                id={item.id}
                type={item.type}
                album={item.album}
                images={item.images}
                name={item.name}
                artists={item.artists}
                previewUrl={item.preview_url}
                durationMs={item.duration_ms}
                followers={item.followers}
              />
            );
          })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.searchScreen}>
      <Header />
      <Text style={styles.textStyle}>Search</Text>
      <View style={styles.searchContainer}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          value={searchTerm}
          onChangeText={searchTermHandler}
          placeholder="What do you want to listen to ?"
          selectionColor={COLORS.primary}
          placeholderTextColor={COLORS.white}
          style={styles.textInput}
        />
      </View>
      <View style={styles.footerContainer}>
        {isUserSearching ? (
          renderSearchResults()
        ) : (
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
        )}
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
