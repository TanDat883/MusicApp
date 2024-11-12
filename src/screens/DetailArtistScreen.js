import { Text, SafeAreaView, StyleSheet, View, Image, FlatList } from 'react-native';

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
    case 'Bai3.jpg':
      return require('../images/songs/Bai3.jpg');
    default:
      return require('../images/artists/hieu.jpg');
  }
};

const DetailArtistScreen = ({ navigation, route }) => {
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
        <Image style={styles.img} source={getImage(item.avatar)} />
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
     <FlatList
        data={item.listsong}
        keyExtractor={song => song.id}
        renderItem={renderSongItem}
      />
    </SafeAreaView>
  );
}

export default DetailArtistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'black',
  },
  top: {
    alignItems: 'center',
    paddingVertical: 20, // Thêm padding để tạo không gian cho tên
    borderRadius: 15, // Bo góc cho phần trên
  },
  img: {
    width: "90%",
    height: 200, // Đặt chiều cao cụ thể cho hình ảnh
    borderRadius: 15, // Bo góc cho hình ảnh
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10, // Khoảng cách giữa hình ảnh và tên
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