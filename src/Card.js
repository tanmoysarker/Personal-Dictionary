import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const img = 'https://cdn.shopify.com/s/files/1/0002/4680/8603/products/sjDBHUW_1600x1600.png?v=1606994170'
const Card = props => {

  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    return () => rerender();
  })
  const rerender = async () => {
    var definitions = props.meaning.definitions;
    if (viewData !== []) {
      await setViewData(props.meaning.definitions)
    }

  }
  if (viewData === []){
    return (
      <View style={styles.card}>
        <Text>No data found</Text>
      </View>
    )
  }else {
    var showData = props.meaning.definitions;
    return (
      <View style={styles.card}>
        { showData.map((v,i) => {
          return (
            <View key={i}>
              <Image
                style={styles.tinyImage}
                source={{ uri: v.image_url === null ? img : v.image_url }}
              />
              <Text style={styles.textStyleFirst}>{v.type === null ? null : v.type}</Text>
              <Text style={styles.textStyleSecond}>{v.definition === null ? null : v.definition}</Text>
              <Text style={styles.textStyleThird}>{v.example === null ? null : `"${v.example}"`}</Text>
            </View>
          )
        })
        }
  
  
      </View>
    );
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
export default Card;