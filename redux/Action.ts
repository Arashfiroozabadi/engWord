export type Data = {
  meaning: string;
  word: string;
};

type addNew = {
  item: {
    meaning: string;
    word: string;
  };
  type: string;
};
type remove = {
  removeTarget: string;
  type: string;
};
type update = {
  all: Array<Data>;
  type: string;
};
type all = Array<Data>;

export function addNewWord(data: Data): addNew {
  return {
    type: "add",
    item: {
      word: data.word,
      meaning: data.meaning,
    },
  };
}

export function updateWords(all: all): update {
  return {
    type: "updateWords",
    all,
  };
}

export function removeWord(target: string): remove {
  return {
    type: "remove",
    removeTarget: target,
  };
}
