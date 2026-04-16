import * as React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TableView, Cell, Section } from 'react-native-tableview-simple';


const HomescreenCell = (props) =>(
  <Cell
    {...props}
    contentContainerStyle={{height:290, justifyContent:'center'}}
    backgroundColor='transparent'
    highlightUnderlayColor='#ccc'
    onPress={props.action}
    cellContentView={
      <View style={{width:'100%'}}>
        <Image
          style={{
            width:'100%', 
            height: '70%', 
            resizeMode:'cover',
            borderRadius: 20
          }}
          source={props.imgUri}
        />
        <View 
          style={{
            position:'absolute',
            top:'60%', 
            left:'70%',
            backgroundColor:'white',
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 20,
            borderBlockColor: 'white'
            }}>
          <Text 
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          }}>
            {props.eta} {"\n"}mins
          </Text>
        </View>
        
        <Text style={{fontSize: 30, fontWeight:'bold'}}>{props.title}</Text>
        <Text style={{color: 'gray'}}>{props.tagline}</Text>
      </View>
    }
  />
)

function DetailsScreen({route}) {
  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        <TableView>
        {route.params.items.map((item) => (
          <Section header={item.title}>
            {item.contents.map((content) => (
              <Cell title={content.title}/>
            ))}
          </Section>
        ))}
          
        </TableView>
      </ScrollView>
    </SafeAreaView>
    
  );
}
function HomeScreen({navigation}) {
  return (
    <SafeAreaView>
    <ScrollView style={{height:"100%", backgroundColor:'seashell'}}>
      <TableView>
        <Section name="" hideSeparator separatorTintColor={'#ccc'}>

          <HomescreenCell
            title="Gelato Deluxe"
            tagline="Desert, Ice cream, Coffee  £"
            eta="5-10"
            imgUri={require('./images/gelato-deluxe.jpg')}
            action={()=>navigation.navigate(
              'Menu',
              {items: [
                {"title":"Gelato", "contents":[{"title":"Vanilla"}, {"title":"Chocolate"}, , {"title":"Hazelnut"}]},
                {"title":"Coffee", "contents":[{"title":"Americano"}, {"title":"Cappucino"}, {"title":"Espresso"}, {"title":"Latte"}]}
              ]}
            )}
          />

          <HomescreenCell
            title="Super Dinner"
            tagline="American, Burgers  ££"
            eta="15-35"
            imgUri={require('./images/super-dinner.jpg')}
            action={()=>navigation.navigate(
              'Menu',
              {items: [
                {"title":"Soups", "contents":[{"title":"Chicken Noodle Soup"}, {"title":"Tomato Soup"}]},
                {"title":"Handhelds", "contents":[{"title":"Chicken Sandwich"}, {"title":"Cheesburger"}, {"title":"BBQ Pork Sandwich"}]},
                {"title":"Mains", "contents":[{"title":"Grilled Chicken"}, {"title":"Meatloaf"}, {"title":"Steak"}]},
                {"title":"Sides", "contents":[{"title":"Mashed Potatoes"}, {"title":"French Fries"}, {"title":"Steamed Vegatables"}, {"title":"Wild Rice"}]}
              ]}
            )}
          />

          <HomescreenCell
            title="Cookies & You"
            tagline="Desert, Cookies  £"
            eta="1 - 5 "
            imgUri={require('./images/cookies-and-you.jpg')}
            action={()=>navigation.navigate(
              'Menu',
              {items: [
                {"title":"Cookies", "contents":[{"title":"Chocolatechip"}, {"title":"Strawberry shortcake"}]},
                {"title":"Ice cream", "contents":[{"title":"Vanilla"}, {"title":"Chocolate"}, {"title":"Strawberry"}]}
              ]}
            )}
          />

          <HomescreenCell
            title="La Pasta"
            tagline="Italian, Pasta  £££"
            eta=" 40+ "
            imgUri={require('./images/la-pasta.jpg')}
            action={()=>navigation.navigate(
              'Menu',
              {items: [
                {"title":"Soup", "contents":[{"title":"Minestroni"}, {"title":"Italian wedding"}]},
                {"title":"Salad", "contents":[{"title":"Cesar salad"}, {"title":"Summer salad"}]},
                {"title":"Pasta", "contents":[{"title":"Spaghetti Bolognese"}, {"title":"Chicken Penne"}, {"title":"Carbonara"}]}
              ]}
            )}
          />
                  
        </Section>         
      </TableView>
    </ScrollView>
    </SafeAreaView>
  );
}



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={HomeScreen} />
        <Stack.Screen name="Menu" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;