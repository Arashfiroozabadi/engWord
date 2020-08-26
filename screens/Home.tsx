import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  BackHandler,
  Alert,
  NativeModules,
} from "react-native";
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
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({
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
  }, [dispatch, navigation, word]);

  useFocusEffect(
    useCallback(() => {
      const lang = NativeModules.I18nManager.localeIdentifier;

      const backAction = (): boolean => {
        Alert.alert(
          lang === "en_US" || lang === "en_GB" ? "Hold on!" : "صبر کن کجا",
          lang === "en_US" || lang === "en_GB"
            ? "Are you sure you want to Exit 😐?"
            : "میخوای برنامه رو ببندی 😐",
          [
            {
              text:
                lang === "en_US" || lang === "en_GB"
                  ? "Cancel 😍"
                  : "نه عزیزم 😍",
              onPress: () => null,
              style: "cancel",
            },
            {
              text:
                lang === "en_US" || lang === "en_GB"
                  ? "YES 😎"
                  : "آره ببندش 😎",
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", backAction);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])
  );

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
