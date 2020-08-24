import * as React from "react";
import { StyleSheet } from "react-native";

import { MonoText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import BoxModel from "../../constants/BoxModel";
import FontSize from "../../constants/FontSize";

interface Props {
  text: string;
}

function Header(props: Props): JSX.Element {
  const colorScheme = useColorScheme();

  const { text } = props;
  return (
    <MonoText
      style={{
        color: Colors[colorScheme].headerColor,
        borderBottomColor: Colors[colorScheme].shadow,
        backgroundColor: Colors[colorScheme].headerBGC,
        ...styles.header,
      }}
    >
      {text}
    </MonoText>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: FontSize.header,
    paddingHorizontal: BoxModel.headerPadding,
    paddingBottom: 10,
    borderBottomWidth: 2.5,
  },
});
export default Header;
