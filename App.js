import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AchieveScreen, AvgIncomeByMonthScreen, SubscriberListScreen, ExpectedSalaryScreen, HomeScreen, KPIByMonthDashboardScreen, ProfileScreen, SalaryByMonthContractScreen, SalaryByMonthDashboardScreen, SalaryByMonthFixedwageScreen, SignInScreen, SignOutScreen, SplashScreen, SubscriberQualityScreen, TransactionInfoScreen, UpdatePasswordScreen, UpdateProfileScreen, ProductivitySubScreen, TestScreen, AdminHomeScreen, AdminKPIDashboardScreen, AdminTopTellersKPIScreen, AdminKPIGroupKPIScreen, AdminKPIMonthScreen, AdminProductivitySubScreen, AdminSalaryByMonthDashboardScreen, AdminExpenseManagementScreen, AdminTopSellersScreen, AdminSalaryGroupScreen, AdminMonthSalaryScreen, AdminAvgIncomeDashboardScreen, AdminAvgIncomeTopSellersScreen, AdminAvgIncomeSalaryGroupScreen, AdminAvgIncomeScreen } from './src/screens';
import { colors } from './src/utils/Colors';
import { images } from './src/utils/Images';
import { _retrieveData } from './src/utils/Storage';
import { fontScale } from './src/utils/Fonts';
import { LogBox } from 'react-native';
import Splash from './src/screens/Auth/Splash';
import { View } from 'react-native';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const GDVBottomTab = () => {
  return (
    <Tab.Navigator tabBarOptions={
      {
        activeTintColor: colors.primary,
        inactiveTintColor: '#A2A1A1'
      }
    }
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.user} />
          }
        }} />
      <Tab.Screen
        name="Home"
        component={GDVStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.home} />
          }
        }} />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.logout} />
          }
        }} />
    </Tab.Navigator>
  );
}

const AdminBottomTab = () => {
  return (
    <Tab.Navigator tabBarOptions={
      {
        activeTintColor: colors.primary,
        inactiveTintColor: '#A2A1A1'
      }
    }
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.user} />
          }
        }} />
      <Tab.Screen
        name="Home"
        component={AdminStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.home} />
          }
        }} />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.logout} />
          }
        }} />
    </Tab.Navigator>
  );
}

const GDVStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, gestureEnabled: true }} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="KPIByMonthDashboard" component={KPIByMonthDashboardScreen} />
      <Stack.Screen name="Achieve" component={AchieveScreen} />
      <Stack.Screen name="SalaryByMonthDashboard" component={SalaryByMonthDashboardScreen} />
      <Stack.Screen name="SalaryByMonthFixedwage" component={SalaryByMonthFixedwageScreen} />
      <Stack.Screen name="SalaryByMonthContract" component={SalaryByMonthContractScreen} />
      <Stack.Screen name="AvgIncomeByMonth" component={AvgIncomeByMonthScreen} />
      <Stack.Screen name="SubscriberQuality" component={SubscriberQualityScreen} />
      <Stack.Screen name="ExpectedSalary" component={ExpectedSalaryScreen} />
      <Stack.Screen name="SubscriberList" component={SubscriberListScreen} />
      <Stack.Screen name="TransactionInfo" component={TransactionInfoScreen} />
      <Stack.Screen name="ProductivitySub" component={ProductivitySubScreen} />
    </Stack.Navigator>
  )
}

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="AdminKPIDashboard" component={AdminKPIDashboardScreen} />
      <Stack.Screen name="AdminTopTellersKPI" component={AdminTopTellersKPIScreen} />
      <Stack.Screen name="AdminKPIGroupKPI" component={AdminKPIGroupKPIScreen} />
      <Stack.Screen name="AdminKPIMonth" component={AdminKPIMonthScreen} />
      <Stack.Screen name="AdminProductivitySub" component={AdminProductivitySubScreen} />
      <Stack.Screen name="AdminSalaryByMonthDashboard" component={AdminSalaryByMonthDashboardScreen} />
      <Stack.Screen name="AdminTopSellers" component={AdminTopSellersScreen} />
      <Stack.Screen name="AdminSalaryGroup" component={AdminSalaryGroupScreen} />
      <Stack.Screen name="AdminMonthSalary" component={AdminMonthSalaryScreen} />
      <Stack.Screen name="AdminAvgIncomeTopSellers" component={AdminAvgIncomeTopSellersScreen} />
      <Stack.Screen name="AdminAvgIncomeSalaryGroup" component={AdminAvgIncomeSalaryGroupScreen} />
      <Stack.Screen name="AdminAvgIncome" component={AdminAvgIncomeScreen} />
      <Stack.Screen name="AdminExpenseManagement" component={AdminExpenseManagementScreen} />
      {/* AdminExpenseManagementScreen || AdminKPIGroupKPI || AdminTopSellers*/}
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SignInScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  StatusBar.setBarStyle('light-content', true);
  LogBox.ignoredYellowBox = ["Warning: Each", "Warning: Failed"]

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={AuthStack} />
        <Stack.Screen name="GDVHome" component={GDVBottomTab} />
        <Stack.Screen name="AdminHome" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}