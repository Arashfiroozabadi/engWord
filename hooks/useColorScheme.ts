import { ColorSchemeName } from "react-native";
import { useSelector } from "react-redux";

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
type Theme = {
  theme: "dark" | "light";
};
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const theme = useSelector((state: Theme) => state.theme);

  return theme;
}
