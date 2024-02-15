import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import OnBoardingScreen from './components/onBoarding';
import LoginScreen from './components/logIn';
import SignUpScreen from './components/signUp';
import HomePage from './components/homePage';

import BagPage from './components/screens/bag/BagScreen';
import WarehouseScreen from './components/screens/warehouse/WareHouseScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import WareHouseTemplate from './components/screens/warehouse/wareHouseTemplate';

import InwareHouse from './components/screens/warehouse/InwareHouse';
import MachinesHomePage from './components/screens/machines/machinesHomePage';
import InMachine from './components/screens/machines/InMachine';

function OnBoarding() {
  return (
    <OnBoardingScreen />
  );
}

function Login() {
  return (
    <LoginScreen />
  );
}
function Home() {
  return (
    <HomePage />
  );
}
function BagScreen() {
  return (
    <BagPage />
  );
}
function WarehousePage() {
  return (
    <WarehouseScreen />
  );
}
function ProfilePage() {
  return (
    <ProfileScreen />
  );
}
function WareHouseTemplatePage() {
  return (
    <WareHouseTemplate item={""} />
  );
}
function InwareHousePage() {
  return (
    <InwareHouse />
  );
}
function SignUp() {
  return (
    <SignUpScreen />
  );
}
function MachineScreen() {
  return (
    <MachinesHomePage />
  );
}
function InMachineScreen() {
  return (
    <InMachine />
  );
}

const Stack = createNativeStackNavigator();

function App() {

  const [isFirstTime, setIsFirstTime] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('isFirstTime').then((value) => {
      if (value !== null) {
        setIsFirstTime(false);
      }
    });
  }, []);

  const completeOnboarding = () => {
    AsyncStorage.setItem('isFirstTime', 'false').then(() => {
      setIsFirstTime(false);
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstTime ? (
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} />
        ) : null}
        {/* <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="BagScreen" component={BagScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WarehouseScreen" component={WarehousePage} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="WareHouseTemplate" component={WareHouseTemplatePage} options={{ headerShown: false }} />
        <Stack.Screen name="InwareHouse" component={InwareHousePage} options={{ headerShown: false }} />
        <Stack.Screen name="MachinesHomePage" component={MachineScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InMachine" component={InMachineScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;