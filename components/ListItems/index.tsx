import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

import { ScrollView } from "../Themed";
import Card from "../Card";
import { Data } from "../../redux/Action";

function ListItems(): JSX.Element {
  const word = useSelector((state: { words: Data[] }) => state.words);

  return (
    <ScrollView
      style={{
        ...styles.root,
      }}
    >
      {word.map((item: Data) => (
        <Card key={item.word} data={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {},
});

export default ListItems;
