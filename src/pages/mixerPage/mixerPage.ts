import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
const blender = require('../../assets/images/blender.svg');

class MixerPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container container">

    <div class="mixer">
      <div class="mixer__inner">
        <img src="${blender}" height="180">
        <p>Выберите свои предпочтения, а мы подберем подходящий для Вас микс вкусов!</p>
        <button class="button button-1"><a href="#/mixer/brands">Перейти в каталог</a></button>
        <button class="button button-1"><a href="#">Выбрать по предпочтениям</a></button>
        <button class="button button-1"><a href="#/mix/random">Случайный микс</a></button>
        </div>
    </div>

    </div>
    `;
    return main;
  }
}

export default MixerPage;
