import { atom } from 'jotai';

export const searchAtom = atom('');
export const categoryAtom = atom<string | null>(null);
export const lowerPriceAtom = atom<number | null>(null);
export const upperPriceAtom = atom<number | null>(null);