const storageKey = "DiaryData";

export const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(storageKey);
    if (serializedState === null) return undefined;
    const deserializedState = JSON.parse(serializedState);
    return deserializedState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
