import React, { useState, useEffect } from 'react';
import { View,ScrollView} from 'react-native';
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
    return () => getData;
  })

  const getData = async (value) => {
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
    //await AsyncStorage.removeItem('list')
      try {
        var PreviousfavouriteData = await AsyncStorage.getItem('list')
        if (PreviousfavouriteData === null){
          var allData = [data, JSON.parse(PreviousfavouriteData)]
        }else{
          var allData = [data, ...JSON.parse(PreviousfavouriteData)]
        }
        var finalList = allData.filter(function( element ) {
          return element !== null;
        });
        await AsyncStorage.setItem('list',JSON.stringify(finalList))

      } catch(e) {
        // read error
      }
   

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