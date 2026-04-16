import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TableView, Cell, Section } from 'react-native-tableview-simple';


// global data
var workouts = []

// pages navigation
const Stack = createNativeStackNavigator();

// homescreen - shows list of workouts
function HomeScreen({ navigation }) {
  const [presentedWorkouts, setPresentedWorkouts] = useState(JSON.stringify(workouts)); // reload screen if data was changed 

  function buttonPressed(name, value) {
    if (name == "workout") {
      navigation.navigate(
        'Workout',
        { index: value },
      )
    }
  }

  function addWorkout(){
    workouts.push({
      workoutName: "New Workout",
      workoutDescription: "Edit your new workout",
      exercisesNames: ["Exercise", "Exercise", "Exercise"],
      exercisesTimes: [5, 5, 5]
    })
    saveToMemory();
    buttonPressed('workout', workouts.length - 1);
  }

    // below code implemented from https://reactnavigation.org/docs/function-after-focusing-screen author: unknown, Mar 6 2024
    // trigger below when comming from edit screen to update home screen with edits 
    useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPresentedWorkouts(JSON.stringify(workouts));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
      <SafeAreaView style={{ backgroundColor: 'linen', height: '100%'}}>
        <View style={{marginTop: 10}}></View>
        <ScrollView>
          {workouts.map((workout, index) => (
            
            <TouchableOpacity 
              style={{
                height: 120,
                backgroundColor: 'lightskyblue',
                justifyContent: 'center',   
                margin: 10,
                borderRadius: 30
              }}
              onPress={() => buttonPressed('workout', index)}>
              <Text 
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold'

                }}
                >{workout.workoutName}</Text>

              <Text style={{
                marginLeft: 15,
                fontStyle: 'italic',
                fontSize: 15,
                padding: 10
              }}>{workout.workoutDescription}</Text>
            </TouchableOpacity>

          ))}
  
          <TouchableOpacity style={{
                height: 80,
                backgroundColor: 'lightcyan',
                justifyContent: 'center',   
                margin: 10,
                borderRadius: 30
              }}
              onPress={addWorkout}>
            <Text style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold'

                }}> Add workout</Text>
          </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    );
}

// workout timer 
function WorkoutScreen({ route, navigation }) {

  // workout data
  const [workoutName, setWorkoutName] = useState(workouts[route.params.index].workoutName);
  const [exercisesNames, setExercisesNames] = useState(workouts[route.params.index].exercisesNames);
  const [exercisesTimes, setExercisesTimes] = useState(workouts[route.params.index].exercisesTimes);
  let exerciseIndex = 0;

   // function variables 
   const [isRuning, setIsRunning] = useState(false);
   const timerInterval = useRef(undefined);
   const [exerciseName, setExerciseName] = useState("Ready?"); 
   const [timerValue, setTimerValue] = useState("0:00.0");
   const [exercisesLeft, setExercisesLeft] = useState([...exercisesNames]); // list of exercises left in the workout
   const [timesLeft, setTimesLeft] = useState([...exercisesTimes]); // list of times lein in the workout

  // this is to make sure name of the workout changes when name of the workout was changed in edit screen 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setWorkoutName(workouts[route.params.index].workoutName);
      setExerciseName("Ready?");
      setExercisesNames(workouts[route.params.index].exercisesNames);
      setExercisesTimes(workouts[route.params.index].exercisesTimes);
      const tmpNames = workouts[route.params.index].exercisesNames
      setExercisesLeft([...tmpNames]);
      const tmpTimes = workouts[route.params.index].exercisesTimes
      setTimesLeft([...tmpTimes]);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

 
  // Present time nicely with minutes and seconds 
  function showTime(givenSeconds) {
    minutes = Math.floor(givenSeconds / 60);
    seconds = (Math.round((givenSeconds - minutes * 60) * 10) / 10).toFixed(1);
    setTimerValue(minutes + ":" + seconds);
  }

  // handle button pressed
  function buttonPressed(value) {
    if (value == 'start') {
      if (isRuning) {
        // stop timer
        setIsRunning(!isRuning);
        clearInterval(timerInterval.current);
        setExerciseName("Ready?");
        setTimerValue("0:00.0");
        setExercisesLeft([...exercisesNames]);
        setTimesLeft([...exercisesTimes]);
      } else {
        // start workout
        setIsRunning(!isRuning);
        exerciseIndex = 0;
        exercisesLeft.splice(0,1);  // take item off the list of next exercises
        timesLeft.splice(0,1); // take item of the list of next exercises
        runWorkout(exercisesNames, exercisesTimes);
      }
    }
    if (value == 'edit') {
      navigation.navigate(
        'Edit Workout',
        route.params
      )
    }
  }

  // handles what exercise workout is on 
  function runWorkout(exercises, times) {
    if (exerciseIndex < exercises.length) { // there are exercises to do
      setExerciseName(exercises[exerciseIndex]);
      runTimer(times[exerciseIndex]);
    } else { // workout is completed 
      clearInterval(timerInterval.current);
      setExercisesLeft([...exercisesNames]);
      setExercisesTimes([...exercisesTimes]);
      setExerciseName("Complete");
      setTimerValue("0:00.0");
      setIsRunning(0);
    }

  }

  // tracks time and triggers runWorkout when time of current exercise runs out
  function runTimer(givenSeconds) {
    timerInterval.current = setInterval(() => {
      givenSeconds = givenSeconds - 0.1;
      if (givenSeconds <= 0) { // if exercise run out of seconds go to next exercise
        clearInterval(timerInterval.current);
        ++exerciseIndex;
        exercisesLeft.splice(0,1);  // take item off the list
        timesLeft.splice(0,1); // take item of the list
        showTime("0"); // dont show uneven or minus time
        runWorkout(exercisesNames, exercisesTimes);
      } else { // show how much time is left for current exercise 
        showTime(givenSeconds);
      }
    }, 100)
  }

  return (

    <SafeAreaView style={{ backgroundColor: 'linen', height: '100%'}}>
     
          <View style = {{
              height: 280,
              backgroundColor: 'lightskyblue',  
              margin: 10,
              borderRadius: 30}}>

            {/* Workout Name */}
            <Text style={{
              fontSize: 30,
              margin: 10,
              fontWeight: 'bold'}}>
                {workoutName}
            </Text>

            {/* Exercise Name  */}
            <View style={{backgroundColor: 'aquamarine'}} >
            <Text style={{
              textAlign: 'center',
              fontSize: 50,
              margin: 20,
              fontWeight: 'bold',
            }}
            >{exerciseName}
            </Text>
            </View>

            {/* Timer */}

            <Text style={{
              fontSize: 75,
              fontWeight: 'bold',
              margin: 20
            }}
            >{timerValue}</Text>
    
          </View>


        {/* Start & Stop Button */}
        <TouchableOpacity style={[{
              height: 60,
              justifyContent: 'center',   
              margin: 10,
              borderRadius: 30
            }, 
            isRuning ? {backgroundColor: 'lightskyblue'} : {backgroundColor: 'aquamarine'}]}
            onPress={() => buttonPressed('start')}>
          <Text style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold'

              }}>{isRuning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

          
        {/* Edit button */}
          <TouchableOpacity style={{
              height: 60,
              backgroundColor: 'lightcyan',
              justifyContent: 'center',   
              margin: 10,
              borderRadius: 30
            }}
            onPress={() => buttonPressed('edit')}>
          <Text style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold'

              }}>Edit</Text>
        </TouchableOpacity>

        {/* list of exercises that are left in the workout */}

          <ScrollView style={{
            height: 240,
            backgroundColor: 'lightcyan',
            borderRadius: 30,
            margin: 10}}>
            <TableView>
              <Section header='Next:'>
              {exercisesLeft.map((name, index) => (
              <Cell
                backgroundColor={'lightcyan'}
                cellContentView={
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 1}}>{name}</Text>
                    <Text style={{flex: 1}}>{timesLeft[index]}</Text>
                  </View>
                }
              />
              ))}
              </Section>
            </TableView>
          </ScrollView>



        <ScrollView>

        </ScrollView>

      </SafeAreaView>



  );
}

// workout editor 
function EditWorkoutScreen({ route, navigation }) {
  const [workoutName, setWorkoutName] = useState(workouts[route.params.index].workoutName);
  const [workoutDescription, setWorkoutDescription] = useState(workouts[route.params.index].workoutDescription);
  const [exercisesNames, setExercisesNames] = useState(workouts[route.params.index].exercisesNames);
  const [exercisesTimes, setExercisesTimes] = useState(workouts[route.params.index].exercisesTimes);


  
  // edditing exercise name or time 
  const handleEdit = (param) => {
    // name is for change in exercise name
    if(param.type == 'exerciseName') {
      const updatedNames = [...exercisesNames]; // copy 
      updatedNames[param.index] = param.value; // change element in array 
      setExercisesNames(updatedNames); // update state with new array 
    } 
    // time is for change in exercise time 
    if(param.type == 'time') {
      const updatedTimes = [...exercisesTimes]; // copy 
      updatedTimes[param.index] = param.value; // change element in array 
      setExercisesTimes(updatedTimes); // update state with new array 
    }
    // 
    if(param.type == 'workoutName') {
      setWorkoutName(param.value);
    }
    // 
    if(param.type == 'workoutDescription') {
      setWorkoutDescription(param.value);
    }
  }

  // adding exercise to the list 
  function handleAdd() {
    // -- add exercise name and time -- 
    // name 
    const updatedNames = [...exercisesNames]; // copy 
    updatedNames.push('Exercise') // add element
    setExercisesNames(updatedNames); // update state with new array 
    // time
    const updatedTimes = [...exercisesTimes]; // copy 
    updatedTimes.push('5'); // add element
    setExercisesTimes(updatedTimes); // update state with new array 
  }

  const handleDelete = (param) => {
    // -- delete exercise name and time -- 
    // name 
    const updatedNames = [...exercisesNames]; // copy 
    updatedNames.splice(param.index, 1) // delete element
    setExercisesNames(updatedNames); // update state with new array 
    // time
    const updatedTimes = [...exercisesTimes]; // copy 
    updatedTimes.splice(param.index, 1); // delete element
    setExercisesTimes(updatedTimes); // update state with new array
  }

  // save edits
  function handleSave() {
    workouts[route.params.index].workoutName = workoutName;
    workouts[route.params.index].workoutDescription = workoutDescription;
    workouts[route.params.index].exercisesNames = exercisesNames;
    workouts[route.params.index].exercisesTimes = exercisesTimes;
    saveToMemory(); // save to memory current workouts state
    navigation.navigate(
      'Workout',
      { index: route.params.index}
    )
    //navigation.navigate('Home'); // go to main screen
  }

  // delete entire workout 
  function deleteWorkout() {
    workouts.splice(route.params.index, 1); // delete workout from workouts 
    saveToMemory(); // save to memory current workouts state 
    navigation.navigate('Home'); // go to main screen
  }


  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%", backgroundColor: 'linen' }}>
        <TableView>

        {/* Name and description */}
          <Section header='Name and Description'>
            <Cell cellContentView = {<TextInput style={{width: '100%'}} value={workoutName} onChangeText={(text)=>handleEdit({type: 'workoutName',value: text})}/>}/>
            <Cell cellContentView = {<TextInput style={{width:'100%'}} value={workoutDescription} onChangeText={(text)=>handleEdit({type: 'workoutDescription',value: text})}/>}/>
          </Section>

        {/* List all the exercises and times  */}
        <Section header='Name of exercise                 Time in Seconds'>
        {exercisesNames.map((name, index) => (
          <Cell
          cellContentView={
          <View style={{flexDirection: 'row'}}>
              <TextInput style={{flex: 2}} key={index} value={name} onChangeText={(text)=>handleEdit({index: index,type: 'exerciseName',value: text})}/>
              {/* value is a number but had to be converted to String to be rendered on the screen by TextInput */}
              <TextInput style={{flex: 2, textAlign: 'center'}} key={index} value={(exercisesTimes[index]).toString()} onChangeText={(text)=>handleEdit({index: index,type: 'time',value: text})}/>
              {/* Delete exercise */}
              <TouchableOpacity style={{flex: 1}} onPress={()=>handleDelete({index: index})}>
                <Text style={{color:'lightcoral'}}>Delete</Text>
              </TouchableOpacity>
          </View>
          
          }/>
        ))}
        <Cell
        cellContentView={
        <TouchableOpacity onPress={handleAdd}>
                <Text style={{color:'blue'}}>Add exercise</Text>
        </TouchableOpacity>
        }/>
        </Section>

        
        {/* Save workout */}
        <Section header="Save">
        <Cell
        cellContentView={
        <TouchableOpacity onPress={handleSave} width='100%'>
                <Text style={{color: 'green', fontWeight: 'bold', fontSize:20}}>Save Changes</Text>
        </TouchableOpacity>
        }/>
        </Section>

        {/* Delete entire workout */}
        <Section header='Delete'>
          <Cell 
          cellContentView={
        <TouchableOpacity onPress={deleteWorkout}>
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>Delete Workout</Text>
        </TouchableOpacity>
        }/>
        </Section>
          
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );

}

// save global workouts to AsyncStorage
const saveToMemory = async () => {
  try {
      await AsyncStorage.setItem("@workouts", JSON.stringify(workouts));
      console.log('saved');
  } catch (err) {
      console.log(err);
  }
}


// main app 
export default function App() {
  const [isDataReady, SetIsDataReady] = useState(0);

  // load data from AsyncStorage
  useEffect(() => {
    const firstLoad = async () => {
      savedWorkouts = await AsyncStorage.getItem("@workouts");
      workouts = JSON.parse(savedWorkouts);
      if(!workouts) {
        workouts = [
          {
            workoutName: "Workout 1",
            workoutDescription: "Sits, pushups",
            exercisesNames: ["Sit", "Break", "Push-Ups"],
            exercisesTimes: [4, 5, 3]
          }
        ]
      }
      
      SetIsDataReady(1);

    };
    firstLoad();
  }, []);
  
  // wait for data from AsyncStorage
  if(isDataReady){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Workout"
            component={WorkoutScreen}
          />
          <Stack.Screen
            name="Edit Workout"
            component={EditWorkoutScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return(
      <SafeAreaView>
        <View>
          <Text>Please Wait : Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }
}

