import React, { useState, useEffect } from 'react';
import { View, Switch, ScrollView, TextInput, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, ActivityIndicator, Dimensions, I18nManager } from 'react-native';
import SearchBar from './src/SearchBar';
import { Container, SearchButtonContainer, SearchButtonText, FavouriteButtonContainer, FavouriteButtonText, SaveButtonContainer, SaveButtonText } from './styles';
import Card from './src/Card';
import Cards from './src/Cards';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [data, setData] = useState({
    results: []
  });
  const [view, setView] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    console.log('App.js called')
    return () => getData;
  })

  const getData = async (value) => {

    console.log('render App.js!!', value);
    setData(value);
    setView(true);
  }

  const onPressSearch = () => {
    setToggle(true);
  }
  const onPressFavourites = () => {
    setToggle(false);
  }
  const onPressSave = async () => {
    console.log('current data', data)
    var favouriteData = await AsyncStorage.getItem('list')
    // AsyncStorage.getItem('favourites')
    // .then((favourites) => {
    //       const prevData = JSON.parse(favourites);
    //       const newData = favourites ? [...prevData,...data] : [];
    //       AsyncStorage.setItem('contacts', JSON.stringify(newData));
    // });
    if (favouriteData === null) {
      await AsyncStorage.setItem('list',JSON.stringify(data))
    }else {
      //var allData = await AsyncStorage.mergeItem('list',JSON.stringify(data))
      await console.log('Check 1',AsyncStorage.getItem('list'));
      console.log('Check 2',JSON.stringify(data));
      var PreviousfavouriteData = await AsyncStorage.getItem('list')
      var allData = [JSON.stringify(data), PreviousfavouriteData]
      await AsyncStorage.setItem('list',JSON.stringify(allData))

    }
    console.log('All Data 2>>>',allData )
    console.log('All Data 3>>>',PreviousfavouriteData)

  }
  const SearchPageButton = ({ onPress, title }) => (
    <SearchButtonContainer onPress={onPressSearch}>
      <SearchButtonText>{title}</SearchButtonText>
    </SearchButtonContainer>
  );
  const ListPageButton = ({ onPress, title }) => (
    <FavouriteButtonContainer onPress={onPressFavourites}>
      <FavouriteButtonText>{title}</FavouriteButtonText>
    </FavouriteButtonContainer>
  );

  const SavePageButton = ({ onPress, title }) => (
    <SaveButtonContainer onPress={onPressSave}>
      <SaveButtonText>{title}</SaveButtonText>
    </SaveButtonContainer>
  );


  return (
    <Container>
      <ScrollView>
        <View style={{ flexDirection: 'row', paddingTop: 50, alignSelf: 'center' }}>
          <SearchPageButton title="Search" size="sm" />
          <ListPageButton title="Favourites" size="sm" />
        </View>
        {toggle ?
          <View style={{ alignItems: 'center' }}>
            <SearchBar onResponse={getData} />
            <View>
              {view === true ?
                <View>
                  <Card meaning={data} />
                  <SavePageButton title="Save" size="sm" />
                </View>
                :
                null
              }
            </View>
          </View>
          :
          <View>
            <Cards list={'allData'}/>
          </View>
        }
      </ScrollView>
    </Container>
  );
}