import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BottomNavigationBar from '../components/BottomNavigationBar';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      tabBar={props => <BottomNavigationBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="scan" component={ScanScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default HomeTabs;
