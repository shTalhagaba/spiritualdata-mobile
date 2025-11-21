import HomeScreen from '@app/screens/HomeScreen';
import ProfileScreen from '@app/screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '@app/components/CustomDrawer/CustomDrawer';
import React from 'react';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />

      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Drawer.Navigator>
  );
}
