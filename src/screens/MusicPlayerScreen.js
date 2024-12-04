import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

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

const getAudioLink = (audioFileName) => {
  switch (audioFileName) {
    case 'bai1.mp3':
      return require('../audio/dunglamtraitimanhdau.mp3');
    case 'canginoiyeu.mp3':
      return require('../audio/canginoiyeu.mp3');
    case 'neulucdo.mp3':
      return require('../audio/neulucdo.mp3');
    case 'tayto.mp3':
      return require('../audio/tayto.mp3');
    default:
      return require('../audio/exitsign.mp3');
  }
};

const MusicPlayerScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize useNavigation
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSongs(data);
        setCurrentSong(data[0]);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      const audioLink = getAudioLink(currentSong.audioFile);
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        audioLink,
        { shouldPlay: true, volume: volume }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis / status.durationMillis);
          setDuration(status.durationMillis);
        }
      });

      setSound(newSound);
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (!songs.length) return;
    const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const previousSong = () => {
    if (!songs.length) return;
    const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  if (!currentSong) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading songs...</Text>
      </SafeAreaView>
    );
  }

  const currentTime = Math.floor(progress * duration);
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={getImage(currentSong.image)} style={styles.albumArt} />
      <Text style={styles.songTitle}>{currentSong.name}</Text>
      <Text style={styles.artist}>{currentSong.author}</Text>

      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        onValueChange={(value) => setProgress(value)}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#ffffff"
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formattedCurrentTime}</Text>
        <Text style={styles.timeText}>{formattedDuration}</Text>
      </View>

      <View style={styles.volumeContainer}>
        <Text style={styles.volumeText}>Volume</Text>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#ffffff"
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={previousSong}>
          <Entypo name="controller-jump-to-start" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause}>
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSong}>
          <Entypo name="controller-next" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 50,
  },
  songTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 100,
  },
  artist: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  volumeContainer: {
    width: '80%',
    marginTop: 20,
  },
  volumeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  volumeSlider: {
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MusicPlayerScreen;