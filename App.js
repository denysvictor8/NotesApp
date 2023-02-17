//import 'react-native-gesture-handler';
import Home  from './src/Home/';
import NoteAdd from './src/NoteAdd/';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
        />
        <Stack.Screen
          component={NoteAdd}
          name="NoteAdd"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


