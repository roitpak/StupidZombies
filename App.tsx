import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './src/screens/GameScreen';
import {screens} from './src/screens/screens';
import IntroScreen from './src/screens/IntroScreen';
import levelsScreen from './src/screens/LevelsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={screens.introScreen} component={IntroScreen} />
        <Stack.Screen name={screens.levelsScreen} component={levelsScreen} />
        <Stack.Screen name={screens.gameScreen} component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
