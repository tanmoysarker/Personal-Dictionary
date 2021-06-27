import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const img = 'https://cdn.shopify.com/s/files/1/0002/4680/8603/products/sjDBHUW_1600x1600.png?v=1606994170'

const Cards = props => {
  const [savedData, setSavedData] = useState([]);
  

  useEffect(async () => {
   
    getData();

  },[])

  const getData = async () => {
    var favouriteData = await AsyncStorage.getItem('list')
  
    var savedData = JSON.parse(favouriteData);
    
    var parseHeader = savedData.map(datum => {
      return datum.word;
    }
    )
    var newParsedHeader = parseHeader.filter(function( element ) {
      return element !== undefined;
   });
    console.log('render merge 2', newParsedHeader);

    var parsedData = savedData.map(datum => {
      return datum.definitions;
    }
      )
  
    
    var newParsedData = parsedData.filter(function( element ) {
      return element !== undefined;
   });
    setSavedData(newParsedData.flat());
  } 

  console.log('render merge final >>', savedData );

  if (savedData === []){
    return(
      <View style={styles.card}>
        <Text>No data saved</Text>
      </View>
    )
  }else {
    return (
      <View style={styles.card}>
      { savedData.map((x,i) => {
        // return v.map((x,i)=> {
          return(
            <View key={i}> 
             <Image
              style={styles.tinyImage}
              source={{ uri: x.image_url === null ? img : x.image_url }}
            />
            <Text style={styles.textStyleFirst}>{x.type === null ? null : x.type}</Text>
            <Text style={styles.textStyleSecond}>{x.definition === null ? null : x.definition}</Text>
            <Text style={styles.textStyleThird}>{x.example === null ? null : `"${x.example}"`}</Text>
          </View>
            )
        // })
       
         })
      }
  
  
    </View>
    )
  }

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
    alignSelf: 'center',
    paddingTop:10
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