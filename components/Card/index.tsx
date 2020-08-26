import React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import BoxModel from "../../constants/BoxModel";
import useColorScheme from "../../hooks/useColorScheme";
import { View, Text } from "../Themed";
import { Data } from "../../redux/Action";
import Btn from "../Btn";

type Props = {
  data: Data;
  onDelete: () => void;
};

function Card(props: Props): JSX.Element {
  const colorScheme = useColorScheme();

  const { data, onDelete } = props;
  return (
    <View
      style={{
        borderColor: Colors[colorScheme].cardBorderColor,
        backgroundColor: Colors[colorScheme].cardBGC,
        ...styles.root,
      }}
    >
      <View>
        <Text
          style={{
            color: Colors[colorScheme].cardWordTextColor,
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
      <View>
        <Btn
          iconSize={35}
          fullSize
          Delete
          title="x"
          onPress={() => onDelete()}
        />
      </View>
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
