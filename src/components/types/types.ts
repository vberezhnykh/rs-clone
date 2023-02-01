export interface InterfaceContainerElement {
  draw: () => HTMLElement;
}

export interface Brand {
  name: string;
  image: string;
  id: number;
}

export type Brands = Brand[];

export interface Flavor {
  brand: string;
  name: string;
  description: string;
  image: string;
  strength: string;
  flavor: string[];
  id: number;
}

export type Flavors = Flavor[];

export type Composition = { [key: string]: number };

export interface Mix {
  name: string;
  description: string;
  compositionById: Composition;
  compositionByPercentage: Composition;
  image: string;
  id: number;
}

export type Mixes = Mix[];
