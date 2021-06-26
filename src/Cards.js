import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cards = props => {

  useEffect(async () => {
    var favouriteData = await AsyncStorage.getItem('list')
    // var mergeFavouriteData = await AsyncStorage.mergeItem('favourites', favouriteData)
    console.log('render merge !', favouriteData);
    return () => console.log('unmounting...', props.list);
  })

  return (
    <View style={styles.card}>
      <Image
        style={styles.tinyImage}
        source={{ uri: 'https://media.owlbot.info/dictionary/images/aaaaaaaaaaaaaaaaac.jpg.400x400_q85_box-42,0,943,900_crop_detail.jpg' }}
      />
      <Text style={styles.textStyleFirst}>noun</Text>
      <Text style={styles.textStyleSecond}>a waterhole from which animals </Text>
      <Text style={styles.textStyleThird}>"a watering hole for singles"</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#E3EAED',
    padding: 20,
    borderRadius: 10,
    marginTop: 100
  },
  tinyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },
  textStyleFirst: {
    fontSize: 14,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  textStyleSecond: {
    fontSize: 14,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  textStyleThird: {
    fontSize: 14,
    paddingTop: 10,
    paddingHorizontal: 10,
    color: '#706f6f'
  }
});
export default Cards;