import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Text, Button, View, TextInput } from "../Themed";
import Title from "../Title";
import BoxModel from "../../constants/BoxModel";
import Divider from "../Divider";
import Btn from "../Btn";
import { addNewWord, removeWord } from "../../redux/Action";

interface WordType {
  meaning: string;
  word: string;
}

type Props = {
  close: () => void;
};

function AddWrod(props: Props): JSX.Element {
  const [Word, setWord] = useState<WordType>({
    word: "",
    meaning: "",
  });

  const theme = useSelector((state: any) => state.theme);
  const words = useSelector((state: any) => state.words);

  const dispatch = useDispatch();

  function handleChangeText(text: string, name: string): void {
    setWord({ ...Word, [name]: text });
  }

  function handleAdd(): void {
    dispatch(addNewWord(Word));
    setWord({ word: "", meaning: "" });
  }

  return (
    <View style={styles.container}>
      <View>
        <Title text="Add new Word" />
        <Divider />
        <View style={styles.row}>
          <TextInput
            value={Word.word}
            placeholder="Word"
            onChangeText={(text) => handleChangeText(text, "word")}
            styles={styles.textInput}
          />
          {/* <Divider /> */}
          <TextInput
            value={Word.meaning}
            placeholder="Meaning"
            styles={styles.textInput}
            onChangeText={(text) => handleChangeText(text, "meaning")}
          />
        </View>
        <View style={styles.add}>
          <Btn title="add" onPress={handleAdd} />
        </View>
      </View>
      <View>
        {words.map((item: { meaning: string; word: string }) => (
          <Text key={item.word} onPress={() => dispatch(removeWord(item.word))}>
            {item.word + " === " + item.meaning}
          </Text>
        ))}
        <Button
          title="theme"
          onPress={() =>
            dispatch({ type: theme === "dark" ? "light" : "dark" })
          }
        />
        <Button title="X" onPress={() => props.close()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: BoxModel.containerPadding,
  },
  textInput: {
    borderWidth: 2,
    width: "40%",
    margin: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  add: {
    alignItems: "center",
    margin: 10,
  },
});

export default AddWrod;
