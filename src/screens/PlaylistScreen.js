import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import React, { useState } from 'react';

/* Call API */
import useFetch from '../hooks/useAPI'; 
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://6733601e2a1b1a4ae1134c74.mockapi.io/playlist';

const getImage = (imagePath) => {
  switch (imagePath) {
    case 'chill.jpg':
      return require('../images/playlist/chill.jpg');
    default:
      return require('../images/playlist/rap.jpg');
  }
};

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity style={styles.playlistCart} onPress={() => navigation.navigate('DetailPlaylistScreen', { item })}>
      <Image style={styles.image} source={getImage(item.image)} />
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>{item.name}</Text>     
    </TouchableOpacity>
  );
}

const PlaylistScreen = ({ navigation }) => {
  const { data: playlist, loading, error, refetch } = useFetch(API_URL);
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

  // Filter playlist based on searchText
  const filteredPlaylist = playlist.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginTop: 60, marginLeft: 50 }}>Playlist</Text>
      <View style={styles.search}>
        <Fontisto name="search" size={24} color="white" />
        <TextInput
          style={styles.textinput}
          placeholder='Find in Playlist'
          placeholderTextColor="#9095A0" // Optional: Change placeholder color
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredPlaylist} // Use the filtered playlist
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
}

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 50,
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
    borderWidth: 0.8,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
    marginLeft: 20
  },
  playlistCart: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
});