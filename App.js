import React, { useState } from 'react';
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
    if (favouriteData !== null) {
      var allData = [data, ...favouriteData]
      console.log('All Data>>', allData)
    }

    // const USER_2 = {
    //   name: 'Sarah',
    //   age: 21,
    //   hobby: 'cars',
    //   traits: {
    //     eyes: 'green',
    //   }
    // }
    // var mergeData = await AsyncStorage.mergeItem('favourites',JSON.stringify(USER_2))
    // const currentUser = await AsyncStorage.getItem('favourites')
    // console.log('current data2',currentUser)
    // setData(mergeData);

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
  console.log('render App.js>>', data);


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
            <Cards />
          </View>
        }
      </ScrollView>
    </Container>
  );
}