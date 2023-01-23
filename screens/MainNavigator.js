// src/navigation/MainNavigator.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import Introduction from './Introduction';
import Login from './Login';
import Registration from './Registration';
import Forgot from './Forgot';
import Dashboard from './Dashboard';

// import HomeScreen from '../screens/HomeScreen';
// import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{animationEnabled: false, header: () => null}}
          component={Splash}
        />
        <Stack.Screen
          name="Introduction"
          options={{animationEnabled: false, header: () => null}}
          component={Introduction}
        />
         <Stack.Screen
          name="Login"
          options={{animationEnabled: false, header: () => null}}
          component={Login}
        />
           <Stack.Screen
          name="Registration"
          options={{animationEnabled: false, header: () => null}}
          component={Registration}
        />
           <Stack.Screen
          name="Forgot"
          options={{animationEnabled: false, header: () => null}}
          component={Forgot}
        />
        <Stack.Screen
          name="Dashboard"
          options={{animationEnabled: false, header: () => null}}
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;