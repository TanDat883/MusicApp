import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, Image, ActivityIndicator, FlatList } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import React, { useState } from 'react';

/* Call API */
import useFetch from '../hooks/useAPI'; 
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://6459ebf065bd868e930ba426.mockapi.io/artists';

const getImage = (imagePath) => {
  switch (imagePath) {
    case 'tung.png':
      return require('../images/artists/tung.png');
    case 'wxrdie.png':
      return require('../images/artists/wxrdie.png');
    case 'amme.png':
      return require('../images/artists/amme.jpg');
    case 'tlinh.png':
      return require('../images/artists/tlinh.jpg');
    case 'mck.png':
      return require('../images/artists/mck.png');
    default:
      return require('../images/artists/hieu.jpg');
  }
};

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity style={styles.artistCart} onPress={() => navigation.navigate('DetailArtistScreen', { item })}>
      <Image style={styles.image} source={getImage(item.avatar)} />
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const ArtistScreen = ({ navigation }) => {
  const { data: artists, loading, error, refetch } = useFetch(API_URL);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      refetch();  
    }, [refetch])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />; 
  }

  if (error) {
    return <Text>Error fetching data...</Text>; 
  }

  // Lọc nghệ sĩ dựa trên văn bản tìm kiếm
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 60, marginLeft: 50 }}>Artists</Text>
      <View style={styles.search}>
        <Fontisto name="search" size={24} color="white" />
        <TextInput 
          style={styles.textinput} 
          placeholder='Find in Artists' 
          value={searchText}
          onChangeText={setSearchText} // Cập nhật văn bản tìm kiếm
        />
      </View>
      <FlatList
        data={filteredArtists} // Sử dụng danh sách nghệ sĩ đã lọc
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
}

export default ArtistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  textinput: {
    width: '80%',
    height: 40,
    fontWeight: 'bold',
    borderColor: '#9095A0',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  search: {
    backgroundColor: "#131624",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: '80%',
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#C0C0C0",
    borderWidth: 0.8
  },
  artistCart: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
    marginLeft: 20
  },
});