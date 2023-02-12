import { createHTMLElement } from '../utils/createHTMLElement';
import { Mixes } from './types/types';
import { MixesList } from './mixesList/mixesList';

const PAGE_TITLE = 'Результаты';

export class MixerNowResult {
  private mixes: Mixes;
  constructor(mixes: Mixes) {
    this.mixes = mixes;
  }
  create() {
    const resultContainer = createHTMLElement('result-container');
    resultContainer.appendChild(createHTMLElement('result__title', 'span', PAGE_TITLE));
    resultContainer.appendChild(new MixesList(this.mixes).create());
    return resultContainer;
  }
}
