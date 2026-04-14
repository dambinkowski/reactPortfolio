import { StyleSheet, Text, View } from 'react-native';

// Tic Tac Toe board

export default function App() {
  return (
    <View style={styles.mainView}>
      <View style={styles.box}>
      
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={[styles.text, {backgroundColor:"red"}]} adjustsFontSizeToFit>X</Text>
            <Text style={[styles.text, {backgroundColor:"yellow"}]} adjustsFontSizeToFit>X</Text>
            <Text style={[styles.text, {backgroundColor:"green"}]} adjustsFontSizeToFit>O</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.text, {backgroundColor:"blue"}]} adjustsFontSizeToFit>O</Text>
            <Text style={[styles.text, {backgroundColor:"purple"}]} adjustsFontSizeToFit>X</Text>
            <Text style={[styles.text, {backgroundColor:"gray"}]} adjustsFontSizeToFit>O</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.text, {backgroundColor:"teal"}]} adjustsFontSizeToFit>O</Text>
            <Text style={[styles.text, {backgroundColor:"orange"}]} adjustsFontSizeToFit>O</Text>
            <Text style={[styles.text, {backgroundColor:"pink"}]} adjustsFontSizeToFit>X</Text>
          </View>
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  box: {
    width: '90%',
    aspectRatio: 1
  },
  text: {
    flex: 1,
    fontSize: 999,
    textAlign: 'center',
  }
});