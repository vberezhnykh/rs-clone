import { isFlavorsType } from './isFlavorsType';
import { Flavors } from '../components/types/types';

export function getFlavorsInMixer() {
  const dataInStorage = localStorage.getItem('flavors');
  const flavorsInMixer: Flavors =
    dataInStorage && isFlavorsType(JSON.parse(dataInStorage)) ? JSON.parse(dataInStorage) : [];
  return flavorsInMixer;
}
