import React, { useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { useDispatch } from "react-redux";

import { Button, View, TextInput } from "../Themed";
import Title from "../Title";
import BoxModel from "../../constants/BoxModel";
import Divider from "../Divider";
import Btn from "../Btn";
import { addNewWord } from "../../redux/Action";

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

  const dispatch = useDispatch();

  function handleChangeText(text: string, name: string): void {
    setWord({ ...Word, [name]: text });
  }

  function handleAdd(): void {
    Keyboard.dismiss();
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
        <Button title="Go back" onPress={() => props.close()} />
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
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  add: {
    alignItems: "center",
    margin: 10,
  },
});

export default AddWrod;
