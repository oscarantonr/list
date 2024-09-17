import { atom } from 'nanostores';
import { $counter } from "./DataContext";


export const product = atom({
  id: "",
  text: "",
});

export const products = atom([]);

export const textStore = atom("");
