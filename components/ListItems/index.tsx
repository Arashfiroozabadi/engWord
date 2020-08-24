import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

import { ScrollView, View } from "../Themed";
import Card from "../Card";
import { Data } from "../../redux/Action";

function ListItems(): JSX.Element {
  const word = useSelector((state: { words: Data[] }) => state.words);

  return (
    <ScrollView>
      <View style={styles.root}>
        {word.map((item: Data) => (
          <Card key={item.word} data={item} />
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
