import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";

import LoginScreen from './src/screens/LoginScreen';
import SongScreen from './src/screens/SongScreen';
import ArtistScreen from './src/screens/ArtistScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import DetailArtistScreen from './src/screens/DetailArtistScreen';
import DetailPlaylistScreen from './src/screens/DetailPlaylistScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs(){
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{
                backgroundColor:"black",
                position: "absolute",
                bottom:0,
                left:0,
                right:0,
                shadowOpacity:4,
                shadowRadius:4,
                elevation:4,
                shadowOffset:{
                    width:0,
                    height:-4
                },
                borderTopWidth:0 
            }
        }}>
        
            <Tab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                tabBarLabel: "Favorite",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                    <Entypo name="heart" size={28} color="white" />
                    ) : (
                    <AntDesign name="hearto" size={24} color="white" />
                    ),
                }}
            />

            <Tab.Screen
                name="Playlist"
                component={PlaylistScreen}
                options={{
                tabBarLabel: "Playlists",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <MaterialCommunityIcons name="playlist-music" size={24} color="white" />
                    ) : (
                        <MaterialCommunityIcons name="playlist-music-outline" size={24} color="white" />
                    ),
                }}
            />

            <Tab.Screen
                name="Song"
                component={SongScreen}
                options={{
                tabBarLabel: "Songs",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                       <Ionicons name="musical-notes-sharp" size={24} color="white" />
                    ) : (
                        <Ionicons name="musical-notes-outline" size={24} color="white" />
                    ),
                }}
            />

            <Tab.Screen
                name="Artist"
                component={ArtistScreen}
                options={{
                tabBarLabel: "Artists",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Ionicons name="person" size={24} color="white" />
                    ) : (
                        <Ionicons name="person-outline" size={24} color="white" />
                    ),
                }}
            />
            
        </Tab.Navigator>
    )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="DetailArtistScreen" component={DetailArtistScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetailPlaylistScreen" component={DetailPlaylistScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
