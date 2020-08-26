import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Alert, NativeModules } from "react-native";

import { ScrollView, View } from "../Themed";
import Card from "../Card";

import { Data, removeWord } from "../../redux/Action";

function ListItems(): JSX.Element {
  const dispatch = useDispatch();
  const word = useSelector((state: { words: Data[] }) => state.words);

  const DeleteAlert = (target: string): void => {
    const lang = NativeModules.I18nManager.localeIdentifier;
    Alert.alert(
      lang === "en_US" || lang === "en_GB"
        ? "Delete this item ?"
        : "این مورد حذف شود ؟",
      target,
      [
        {
          text: lang === "en_US" || lang === "en_GB" ? "Yes" : "خیر",
          style: "default",
          onPress: () => dispatch(removeWord(target)),
        },
        {
          text:
            lang === "en_US" || lang === "en_GB"
              ? "Cancel"
              : "بی خیال گناه داره",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        {word.map((item: Data) => (
          <Card
            key={item.word}
            data={item}
            onDelete={() => DeleteAlert(item.word)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default ListItems;
