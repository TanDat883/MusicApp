import { Text, SafeAreaView, StyleSheet, View, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';

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
    default:
      return require('../images/songs/bai2.jpg');
  }
};

const FavoriteScreen = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Filter favorites based on the heart property and search text
  const filteredFavorites = songs.filter(song => 
    song.heart && song.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorite Songs</Text>
      <View style={styles.search}>
        <Fontisto name="search" size={24} color="white" />
        <TextInput 
          style={styles.textinput} 
          placeholder='Find in Favorites' 
          value={searchText} 
          onChangeText={setSearchText} 
        />
      </View>
      <FlatList
        data={filteredFavorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.songCart}>
            <Image style={styles.image} source={getImage(item.image)} />
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;

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
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    fontSize: 15,
  },
});