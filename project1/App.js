import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

// Name badge 

export default function App() {
  changeScreenOrientation();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>hello</Text>
      <Text style={styles.subtitleText}>my name is</Text>
  
      <View style={styles.box}>
        <Text style={styles.nameText}>Damian</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 90,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    width: "100%", 
    height: "55%", 
    backgroundColor: "white", 
    borderRadius: 5, 
    justifyContent:"center",

  },
  nameText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Ref: based on example from https://docs.expo.dev/versions/latest/sdk/screen-orientation/, Nov-1-23
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}
