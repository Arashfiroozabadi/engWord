import * as React from "react";
import {
  TextStyle,
  Text as DefaultText,
  View as DefaultView,
  Button as DefaultButton,
  ScrollView as DefaultScrollView,
  TextInput as DefaultTextInput,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BoxModel from "../constants/BoxModel";

export function useThemeColor(
  props: { dark?: string; light?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  darkColor?: string;
  lightColor?: string;
};

type textinput = {
  darkColor?: string;
  lightColor?: string;
  styles?: TextStyle;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & DefaultButton["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type TextInputProps = textinput & DefaultTextInput["props"];

export function Text(props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
export function Button(props: ButtonProps): JSX.Element {
  const { ...otherProps } = props;
  const colorScheme = useColorScheme();

  return (
    <DefaultButton color={Colors[colorScheme].buttonBGC} {...otherProps} />
  );
}

export function View(props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
export function ScrollView(props: ScrollViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function TextInput(props: TextInputProps): JSX.Element {
  const { styles } = props;

  const colorScheme = useColorScheme();

  return (
    <DefaultTextInput
      placeholderTextColor={Colors[colorScheme].placeholder}
      style={[
        {
          color: Colors[colorScheme].textinputColor,
          borderColor: Colors[colorScheme].textinputBorderColor,
          backgroundColor: Colors[colorScheme].textinputBGC,

          margin: 2.5,
          padding: 10,
          borderRadius: BoxModel.radius,

          elevation: 8,
        },
        styles,
      ]}
      {...props}
    />
  );
}
