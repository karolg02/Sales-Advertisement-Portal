import { atom } from 'jotai';
import {Userdata} from "../features/userdata/userdata.ts";

export const searchAtom = atom('');
export const categoryAtom = atom<string | null>(null);
export const lowerPriceAtom = atom<number | null>(null);
export const upperPriceAtom = atom<number | null>(null);
export const cityAtom = atom<string | null>(null);
export const userData = atom<Userdata | null>(null);