
import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, FlatList } from 'react-native';

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

const DetailPlaylistScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const renderSongItem = ({ item }) => (
    <View style={styles.songItem}>
      <Image style={styles.songImage} source={getImage(item.image)} />
      <View style={styles.songDetails}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.songAuthor}>{item.author}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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