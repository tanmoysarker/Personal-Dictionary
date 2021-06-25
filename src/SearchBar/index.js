import React, { useState } from 'react';
import { View, Image, ScrollView, TextInput, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, ActivityIndicator, Dimensions, I18nManager } from 'react-native';
import { Container, Input, BoxButtonSearch, SearchIcon } from './styles';
import API from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchBar(props) {
  const animation = new Animated.Value(60);
  const { width } = Dimensions.get('window');

  const [searchText, setSearchText] = useState('')
  const [state, setState] = useState({
    results: []
  });

  const handleInput = (e) => {
    setSearchText(e);
  }

  onSearch = async () => {
    console.log('TExt', searchText)
    Animated.spring(animation, {
      toValue: width * 0.7,
      useNativeDriver: false,
    }).start();

    const results = await API.get(`/${searchText}`, {
      headers: { Authorization: "Token 0a11e88ea9f075dc8a660525b3eb557cb25ea789" },
    });

    setState(prevState => {
      return { ...prevState, results: results.data }
    })

    if (typeof (state.results) !== 'string' || state.results !== []) {
      if (state.results.word !== undefined) {
        var word = state.results.word
        var definitions = state.results.definitions
        var wordMeaning = { word, definitions }
        await AsyncStorage.setItem('favourites', JSON.stringify(wordMeaning));

        await props.onResponse(state.results);
      }
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
