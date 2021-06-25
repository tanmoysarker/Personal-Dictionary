import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const Card = props => {

  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    console.log('rerender!', props.meaning);

    return () => rerender();
  })
  const rerender = async () => {
    console.log('Called rerender');
    var definitions = props.meaning.definitions;
    console.log('response>>123', definitions);
    if (viewData !== []) {
      await setViewData(props.meaning.definitions)
    }

  }
  return (
    <View style={styles.card}>
      { viewData.map(v => {
        return (
          <View>
            <Image
              style={styles.tinyImage}
              source={{ uri: v.image_url === null ? null : v.image_url }}
            />
            <Text style={styles.textStyleFirst}>{v.type === null ? null : v.type}</Text>
            <Text style={styles.textStyleSecond}>{v.definition === null ? null : v.definition}</Text>
            <Text style={styles.textStyleThird}>{v.example === null ? null : `"${v.example}"`}</Text>
          </View>
        )
      })
        //  : 
        // <Text>No data found</Text>
      }


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
export default Card;