import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";

import { View, Button, Text } from "../components/Themed";
import { RootStackParamList } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import BoxModel from "../constants/BoxModel";
import AddWrod from "../components/AddWord";
import ListItems from "../components/ListItems";

function HomeScreen({
  navigation,
}: DrawerScreenProps<RootStackParamList, "Home">): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const Theme = useSelector((state: { theme: string }) => state.theme);
  const word = useSelector((state: { words: any }) => state.words);
  const dispatch = useDispatch();

  function close(): void {
    setModalVisible(!modalVisible);
  }

  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  useEffect(() => {
    const load = async (): Promise<any> => {
      try {
        const theme = await AsyncStorage.getItem("theme");
        if (theme !== null) {
          dispatch({ type: theme });
          // setTheme(theme);
        }
      } catch (err) {
        alert(err);
      }
    };
    load();

    return;
  }, [dispatch, word]);

  return (
    <View style={{ ...styles.container }}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <AddWrod close={close} />
      </Modal>
      <View
        style={{
          backgroundColor: Colors[colorScheme].newWord,
          ...styles.header,
        }}
      >
        <Button
          title="add new word"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      <ListItems />
      {/* <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>{pressed ? "Pressed!" : "Press Me"}</Text>
        )}
      </Pressable> */}
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
    // alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  header: {
    padding: 10,
    // borderWidth: 1,
    borderRadius: BoxModel.radius,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});

export default HomeScreen;
