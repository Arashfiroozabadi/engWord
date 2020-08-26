import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, StyleSheet, Platform, StatusBar, Switch } from "react-native";

import { RootStackParamList } from "../types";
import { View } from "../components/Themed";
import Header from "../components/Header";
import Divider from "../components/Divider";
import Title from "../components/Title";

function Setting({
  navigation,
}: DrawerScreenProps<RootStackParamList, "Home">): JSX.Element {
  const theme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  const toggleSwitch = (): void => {
    if (theme === "dark") {
      dispatch({ type: "light" });
    }
    if (theme === "light") {
      dispatch({ type: "dark" });
    }
  };
  return (
    <View style={styles.container}>
      <Header text="Setting" />
      <View style={styles.body}>
        <View
          style={{
            ...styles.row,
          }}
        >
          <Title text="Theme" />
          <View style={styles.rowBody}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={theme === "light" ? "#f5dd4b" : "#131862"}
              onValueChange={toggleSwitch}
              value={theme === "light" ? true : false}
            />
          </View>
          <Divider />
        </View>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go to Home"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  switch: {
    width: 50,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginHorizontal: 25,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  body: {
    padding: 2.5,
  },
  row: {
    padding: 5,
  },
  rowBody: {
    padding: 5,
  },
});

export default Setting;
