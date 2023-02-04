import { Brand, Flavor, Mix } from '../components/types/types';

export function sortFoundBrandResults(a: Brand, b: Brand, inputValue: string) {
  if (a.name.toLowerCase().startsWith(inputValue)) return -1;
  return 0;
}

export function sortFoundFlavorResults(a: Flavor, b: Flavor, inputValue: string) {
  if (a.name.toLowerCase().startsWith(inputValue)) return -1;
  return 0;
}

export function sortFoundMixResults(a: Mix, b: Mix, inputValue: string) {
  if (a.name.toLowerCase().startsWith(inputValue)) return -1;
  return 0;
}
