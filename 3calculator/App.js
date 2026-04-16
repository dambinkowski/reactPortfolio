import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import {useState } from 'react'

const scaledToWidth = Dimensions.get('window').width / 4;
export default function App() {

  const[answerValue, setAnswerValue] = useState('0');
  const[readyToReplace, setReadyToReplace] = useState(1);
  const[memoryValue, setMemoryValue] = useState(0);
  const[operatorValue, setOperatorValue] = useState(0);




  function buttonPressed(value) {
    if(value == 'C'){
      clearState();
    } else if (!isNaN(value)) {
      handleNumber(value);
    } else if (value == '.') {
      setAnswerValue(answerValue + value);
    } else if (value == '+' || value == '-' || value == 'x' || value == '/') { 
      if(operatorValue != 0){ // this allows chain calculations 
        setMemoryValue( calculateEquals());
      } else {
        setMemoryValue(answerValue);
      }
      setOperatorValue(value);
      setReadyToReplace(1);
    } else if (value == '+/-'){
      setAnswerValue(parseFloat(answerValue) * -1);
    } else if (value == '%'){
      setAnswerValue(parseFloat(answerValue) * 0.01);
    } else if (value == '=') {
      calculateEquals();
      setMemoryValue(0);
      setReadyToReplace(1);
    } 
  }

  function handleNumber(number) {
    if(readyToReplace){
      setAnswerValue(number);
      setReadyToReplace(!readyToReplace);
    } else {
      setAnswerValue(answerValue + number);
    }
  }

  function clearState(){
    setAnswerValue('0');
    setReadyToReplace(1);
    setMemoryValue(0);
    setOperatorValue(0);
  }

  function calculateEquals(){
    previus = parseFloat(memoryValue);
    current = parseFloat(answerValue);

    switch(operatorValue){
      case '+':
        result = previus + current;
        setAnswerValue(result)
        return result;
      case '-':
        result = previus - current;
        setAnswerValue(result)
        return result;
      case 'x':
        result = previus * current;
        setAnswerValue(result)
        return result;
      case '/':
        result = previus / current;
        setAnswerValue(result)
        return result;
    }

  }

  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
  
      <View>
        <Text style={styles.resultText}>{answerValue}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.touchableOpacity, styles.topRowButtons]} onPress={()=>buttonPressed('C')}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.topRowButtons]} onPress={()=>buttonPressed('+/-')}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.topRowButtons]} onPress={()=>buttonPressed('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.sideButtons]} onPress={()=>buttonPressed('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.sideButtons]} onPress={()=>buttonPressed('x')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.sideButtons]} onPress={()=>buttonPressed('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.sideButtons]} onPress={()=>buttonPressed('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.longTouchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.numericButtons]} onPress={()=>buttonPressed('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchableOpacity, styles.sideButtons]} onPress={()=>buttonPressed('=')}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      

    <StatusBar style="light" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end'
  },
  resultText:{
    color: 'white',
    fontSize: scaledToWidth* 4/5,
    textAlign: 'right',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',


  }, 
  touchableOpacity: {
    borderWidth: 5,
    borderColor: 'black',
    width: scaledToWidth,
    height: scaledToWidth,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    fontSize: scaledToWidth * 3/5, 
  },
  topRowButtons:{
    backgroundColor: 'lightgray'
  },
  sideButtons:{
    backgroundColor: 'cornflowerblue'
  },
  numericButtons: {
    backgroundColor: 'dimgray'
  },
  longTouchableOpacity: {
    borderWidth: 5,
    borderColor: 'black',
    width: scaledToWidth * 2,
    height: scaledToWidth,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: scaledToWidth
  }


});


