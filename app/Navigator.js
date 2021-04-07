import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Before Login Screens
import Detail from './Screens/Detail';
import Welcome from './Screens/Welcome';

//  Stacks Initilization
const RootStack = createStackNavigator();
const WelcomeStack = createStackNavigator();

//Welcome Stack
function WelcomeScreen() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen name="Home" component={Welcome} />
      <WelcomeStack.Screen name="Detail" component={Detail} />
    </WelcomeStack.Navigator>
  );
}

//Root Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
