import * as React from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import BoxModel from "../../constants/BoxModel";
import useColorScheme from "../../hooks/useColorScheme";
import { View } from "../Themed";

function Divider(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.root}>
      <View
        style={{
          backgroundColor: Colors[colorScheme].divider,
          ...styles.divider,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 2,
    width: "95%",
    borderRadius: 5,
    paddingHorizontal: BoxModel.headerPadding,
    marginVertical: BoxModel.dividerMargin,
  },
});
export default Divider;
