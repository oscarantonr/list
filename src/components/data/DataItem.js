import { atom } from 'nanostores';
import { $counter, increment } from "./DataContext";


export const item = atom({
  id: "",
  text: "",
  emoji: ""
});

export const items = atom([]);
export const setItems = (newItems) => {
  items.set(newItems);
}
// export const addTask = (task) => {
//   tasksStore.set([...tasksStore.get(), task]);
// };

export const textStore = atom("");
export const emojiStore = atom("");

export const groupProducts = atom([]);
export const setGroupProducts = (newGroup) => {
  groupProducts.set(newGroup);
}

export const counter = atom(0);
export const setCounter = (oldValue) => {
  counter.set(oldValue + 1);
}