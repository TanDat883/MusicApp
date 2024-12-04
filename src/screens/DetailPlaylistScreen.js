import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const getImage = (imagePath) => {
  switch (imagePath) {
    case 'bai1.jpg':
      return require('../images/songs/bai1.jpg');
    case 'bai2.jpg':
      return require('../images/songs/bai2.jpg');
    case '22.jpg':
      return require('../images/songs/22.jpg');
    case 'canginoiyeu.jpg':
      return require('../images/songs/canginoiyeu.jpg');
    case 'neulucdo.jpg':
      return require('../images/songs/neulucdo.jpg');
    case 'tayto.jpg':
      return require('../images/songs/tayto.jpg');
    case 'chill.jpg':
      return require('../images/playlist/chill.jpg');
    default:
      return require('../images/playlist/rap.jpg');
  }
};

const DetailPlaylistScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize useNavigation
  const { item } = route.params;

   const openMusicPlayer = (song) => {
    navigation.navigate('MusicPlayerScreen', { song: song });
  };
  const renderSongItem = ({ item }) => (
      <TouchableOpacity style={styles.songCart} onPress={() => openMusicPlayer(item)}>
    <View style={styles.songItem}>
      <Image style={styles.songImage} source={getImage(item.image)} />
      <View style={styles.songDetails}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.songAuthor}>{item.author}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.top}>
        <Image style={styles.img} source={getImage(item.image)} />
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
      <FlatList
        data={item.listsong}
        keyExtractor={song => song.id}
        renderItem={renderSongItem}
      />
    </SafeAreaView>
  );
};

export default DetailPlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 600,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure the button is above other content
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  top: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
  },
  img: {
    width: "90%",
    height: 200,
    borderRadius: 15,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  songDetails: {
    marginLeft: 10,
  },
  songName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  songAuthor: {
    color: '#b0b0b0',
    fontSize: 14,
  },
});