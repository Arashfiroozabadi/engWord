import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BoxModel from "../../constants/BoxModel";
import { Text } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface Props extends TouchableOpacityProps {
  Delete?: boolean;
  fullSize?: boolean;
  iconSize?: number;
  size?: number;
  styles?: StyleProp<ViewStyle>;
  title: string;
}

function Btn(props: Props): JSX.Element {
  const { styles, title, Delete, size = 40, fullSize, iconSize = 40 } = props;
  const colorScheme = useColorScheme();
  if (Delete) {
    return (
      <TouchableOpacity
        style={[
          styles,
          fullSize
            ? {
                padding: 5,
              }
            : {
                width: size,
                height: size,
              },
          {
            backgroundColor: Colors[colorScheme].delButtonBGC,
            borderColor: Colors[colorScheme].buttonBorderColor,
            ...defStyles.delete,
          },
          {},
        ]}
        accessibilityRole="button"
        {...props}
      >
        <MaterialCommunityIcons
          name="delete-circle-outline"
          size={iconSize}
          color={Colors[colorScheme].deleteIconColor}
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[
        {
          width: 100,
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
    elevation: 10,
  },
  text: {
    textAlign: "center",
  },
  delete: {
    borderRadius: BoxModel.radius,
    margin: BoxModel.delBtnMargin,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Btn;
