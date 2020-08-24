import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

import BoxModel from "../../constants/BoxModel";
import { Text } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface Props extends TouchableOpacityProps {
  styles?: StyleProp<ViewStyle>;
  title: string;
}

function Btn(props: Props): JSX.Element {
  const { styles, title } = props;
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: Colors[colorScheme].buttonBGC,
          borderWidth: 2,
          borderColor: Colors[colorScheme].buttonBorderColor,
          ...defStyles.root,
        },
        styles,
      ]}
      accessibilityRole="button"
      {...props}
    >
      <Text
        style={{
          color: Colors[colorScheme].addText,
          ...defStyles.text,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
const defStyles = StyleSheet.create({
  root: {
    margin: BoxModel.btnMargin,
    padding: BoxModel.btnPadding,
    borderRadius: BoxModel.radius,
    textAlign: "center",
    width: 100,
    elevation: 10,
  },
  text: {
    textAlign: "center",
  },
});
export default Btn;
