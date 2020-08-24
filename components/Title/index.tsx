import * as React from "react";
import { StyleSheet, TextProps } from "react-native";

import Colors from "../../constants/Colors";
import BoxModel from "../../constants/BoxModel";
import useColorScheme from "../../hooks/useColorScheme";
import { Text } from "../Themed";
import FontSize from "../../constants/FontSize";

interface Props extends TextProps {
  text: string;
}

function Title(props: Props): JSX.Element {
  const { text } = props;
  const colorScheme = useColorScheme();

  return (
    <Text
      style={{
        color: Colors[colorScheme].title,
        ...styles.title,
      }}
      {...props}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.title,
    marginVertical: BoxModel.dividerMargin,
  },
});
export default Title;
