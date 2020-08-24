import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar, Modal } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";

import { View, Button } from "../components/Themed";
import { RootStackParamList } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import BoxModel from "../constants/BoxModel";
import AddWrod from "../components/AddWord";
import ListItems from "../components/ListItems";

function HomeScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: DrawerScreenProps<RootStackParamList, "Home">): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const colorScheme = useColorScheme();
  const word = useSelector((state: { words: any }) => state.words);
  const dispatch = useDispatch();

  function close(): void {
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    const load = async (): Promise<any> => {
      try {
        const theme = await AsyncStorage.getItem("theme");
        if (theme !== null) {
          dispatch({ type: theme });
        }
      } catch (err) {
        return null;
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  header: {
    padding: 10,
    borderRadius: BoxModel.radius,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default HomeScreen;
