import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

        <View style={{ height: 80 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10
          }}
        >
          <Text>Sign In with spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
        <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
         <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign In with facebook</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : 'black',
  }
});
