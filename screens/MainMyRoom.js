import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Initializing from './Initializing';
import NewThread from './NewThread';
import Threads from './Threads';
import Messages from './Messages';

import {HeaderIcon} from '../components/HeaderIcon';

const MessagingStack = createStackNavigator();
const MessagingStackScreen = () => (
  <MessagingStack.Navigator>
    <MessagingStack.Screen
      name="Threads"
      component={Threads}
      options={({navigation}) => ({
        title: 'New Message',
        headerRight: () => (
          <HeaderIcon
            iconName="add"
            onPress={() => navigation.navigate('NewThread')}
          />
        ),
      })}
    />
    <MessagingStack.Screen
      name="Messages"
      component={Messages}
      options={({route}) => ({
        title: route?.params?.thread?.name,
        headerBackTitle: 'Back',
      })}
    />
  </MessagingStack.Navigator>
);

const NewThreadStack = createStackNavigator();
const NewThreadStackScreen = () => (
  <NewThreadStack.Navigator>
    <NewThreadStack.Screen
      name="NewThreadForm"
      component={NewThread}
      options={({navigation}) => ({
        title: 'New Thread',
        headerLeft: null,
        headerRight: () => (
          <HeaderIcon iconName="close" onPress={() => navigation.pop()} />
        ),
      })}
    />
  </NewThreadStack.Navigator>
);

const ModalStack = createStackNavigator();

const MainMyRoom = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Initializing onHasUser={() => setLoggedIn(true)} />;
  }

  return (
    <NavigationContainer independent={true}>
      <ModalStack.Navigator screenOptions={{headerShown: false}}>
        <ModalStack.Screen name="Messaging" component={MessagingStackScreen} />
        <ModalStack.Screen
          name="NewThread"
          component={NewThreadStackScreen}
          options={{presentation: 'modal'}}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};
export default MainMyRoom;