import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator, Image, FlatList } from 'react-native';
import { Entypo, Fontisto } from "@expo/vector-icons";
import React, { useState } from 'react';
import useFetch from '../hooks/useAPI'; 
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://6459ebf065bd868e930ba426.mockapi.io/songs';

const getImage = (imagePath) => {
  switch (imagePath) {
    case 'bai1.jpg':
      return require('../images/songs/bai1.jpg');
    case 'canginoiyeu.jpg':
      return require('../images/songs/canginoiyeu.jpg');
    case 'neulucdo.jpg':
      return require('../images/songs/neulucdo.jpg');
    case 'tayto.jpg':
      return require('../images/songs/tayto.jpg');
    case '22.jpg':
      return require('../images/songs/22.jpg');
    case 'Bai3.jpg':
      return require('../images/songs/Bai3.jpg');
    default:
      return require('../images/songs/bai2.jpg');
  }
};

const SongScreen = ({ navigation }) => {
  const { data: songs, loading, error, refetch } = useFetch(API_URL); 
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');

  const toggleFavorite = async (item) => {
    const isFavorite = favorites.includes(item.id);
    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav !== item.id) 
      : [...favorites, item.id]; 

    setFavorites(updatedFavorites);

    const updatedSong = { ...item, heart: !isFavorite };

    try {
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSong),
      });

      if (!response.ok) {
        throw new Error('Failed to update song');
      }
      refetch();  // Refetch to update data
    } catch (error) {
      console.error(error);
      setFavorites(prevFavorites => (isFavorite ? [...prevFavorites, item.id] : prevFavorites.filter(fav => fav !== item.id)));
    }
  };

  const openMusicPlayer = (song) => {
    navigation.navigate('MusicPlayerScreen', { song: song });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text>Error fetching data...</Text>;
  }

  const filteredSongs = songs.filter(song => 
    song.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Songs</Text>
      <View style={styles.search}>
        <Fontisto name="search" size={24} color="white" />
        <TextInput 
          style={styles.textinput} 
          placeholder='Find in Songs' 
          value={searchText} 
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={filteredSongs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songCart} onPress={() => openMusicPlayer(item)}>
            <Image style={styles.image} source={getImage(item.image)} />
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
            <TouchableOpacity style={styles.heartContainer} onPress={() => toggleFavorite(item)}>
              <Entypo name="heart" size={28} color={item.heart ? "red" : "white"} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 60,
    marginLeft: 50,
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
  songCart: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  songName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#C0C0C0',
  },
  heartContainer: {
    paddingLeft: 10,
  },
});

export default SongScreen;