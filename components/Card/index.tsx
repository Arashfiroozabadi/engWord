import React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import BoxModel from "../../constants/BoxModel";
import useColorScheme from "../../hooks/useColorScheme";
import { View, Text } from "../Themed";
import { Data } from "../../redux/Action";

type Props = {
  data: Data;
};

function Card(props: Props): JSX.Element {
  const colorScheme = useColorScheme();

  const { data } = props;
  return (
    <View
      style={{
        borderColor: Colors[colorScheme].cardBorderColor,
        backgroundColor: Colors[colorScheme].cardBGC,
        ...styles.root,
      }}
    >
      <Text
        style={{
          backgroundColor: Colors[colorScheme].cardWordTextBGC,
          ...styles.word,
        }}
      >
        {data.word}
      </Text>
      <Text
        style={{
          ...styles.meaning,
        }}
      >
        {data.meaning}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 170,
    margin: BoxModel.btnMargin,
    padding: BoxModel.cardPadding,
    borderWidth: 1,
    borderRadius: BoxModel.radius,
  },
  word: {
    fontSize: 25,
    textAlign: "center",
    borderRadius: 2,
    padding: 2,
  },
  meaning: {
    textAlign: "center",
    fontSize: 20,
    borderRadius: 2,
    padding: 2,
  },
});

export default Card;
