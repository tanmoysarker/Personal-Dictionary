import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, ActivityIndicator, Dimensions, I18nManager } from 'react-native';
import { Container, Input, BoxButtonSearch, SearchIcon } from './styles';
import API from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchBar(props) {
  const animation = new Animated.Value(60);
  const { width } = Dimensions.get('window');

  const [searchText, setSearchText] = useState('')

  const handleInput = (e) => {
    setSearchText(e);
  }

  onSearch = async () => {
    console.log('TExt', searchText)
    Animated.spring(animation, {
      toValue: width * 0.7,
      useNativeDriver: false,
    }).start();

    try {
      var results = await API.get(`/${searchText}`, {
        headers: { Authorization: "Token 0a11e88ea9f075dc8a660525b3eb557cb25ea789" },
      });
      console.log(results);
      if (typeof (results.data) !== 'string' || results.data !== []) {
        if (results.data.word !== undefined) {
          var word = results.data.word
          var definitions = results.data.definitions
          var wordMeaning = { word, definitions }
          await AsyncStorage.setItem('favourites', JSON.stringify(wordMeaning));

          await props.onResponse(results.data);
        }
      }
    } catch (error) {
      Alert.alert('Nothing Found');
    }

  }

  return (
    <Container style={{ width: animation }}>
      <Input autoFocus onChangeText={handleInput} type="text" />
      <BoxButtonSearch onPress={onSearch}>
        <SearchIcon />
      </BoxButtonSearch>
    </Container>
  );
}
