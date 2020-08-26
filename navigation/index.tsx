import * as React from "react";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useSelector } from "react-redux";

import { createDrawerNavigator } from "@react-navigation/drawer";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/Home";
import Setting from "../screens/Setting";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation(): JSX.Element {
  const theme = useSelector((state: any) => state.theme);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Drawer = createDrawerNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerStyle={{}}
      initialRouteName="Home"
      drawerType="slide"
      overlayColor="black"
      backBehavior="initialRoute"
      drawerContentOptions={{
        // activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
}
