import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";

type Theme = "dark" | "light";
type ThemeAction = {
  type: string;
};

const initialState: Theme = "dark";

const storeData = async (value: string): Promise<any> => {
  try {
    await AsyncStorage.setItem("theme", value);
  } catch (e) {
    // saving error
  }
};

function theme(state = initialState, action: ThemeAction): string {
  switch (action.type) {
    case "dark":
      storeData("dark");
      return "dark";
    case "light":
      storeData("light");
      return "light";
    default:
      return state;
  }
}
const initWords = [
  {
    word: "hi",
    meaning: "سلام",
  },
];
interface WORDS {
  meaning: string;
  word: string;
}
interface ActionType {
  item: {
    meaning: string;
    word: string;
  };
  removeTarget: string;
  type: string;
}
function words(state = initWords, action: ActionType): WORDS[] {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return state.filter((e) => e.word !== action.removeTarget);
    default:
      return state;
  }
}

function counter(state: number, action: { type: string }): number | string {
  if (typeof state === "undefined") {
    return 0;
  }
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// A very simple store
const store = createStore(
  combineReducers({ count: counter, theme: theme, words: words }),
  applyMiddleware(thunk)
);

AsyncStorage.getItem("theme", (err, res) => {
  if (err) {
    store.dispatch({ type: "dark" });
  }
  if (res) {
    store.dispatch({ type: res });
  }
});

export default store;
