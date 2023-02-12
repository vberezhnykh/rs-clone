import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../types/types';
const logogithub = require('../../assets/images/github.svg');
const logors = require('../../assets/images/rs-school.svg');
import mixerButtonImgSrc from '../../assets/images/blender.svg';

class Footer implements InterfaceContainerElement {
  draw(): HTMLElement {
    const footer = createHTMLElement('footer', 'footer');

    footer.innerHTML = `
      <div class="footer__container container">
        <div class="footer__github">
        <img src="${logogithub}" alt="Github" height="32"> <a href="https://github.com/Flash226/" target="_blank">flash226</a> | <a href="https://github.com/fkodirov/" target="_blank">fkodirov</a> | <a href="https://github.com/vberezhnykh/" target="_blank">vberezhnykh</a></div>
        <p class="footer__text">2023</p>
        <div class="footer__rs"><a href="https://rs.school/js/" target="_blank"><img src="${logors}" alt="RS School" height="32"></a></div>
        <button class="footer__mixer-image" style="background-image:url(${mixerButtonImgSrc})" onclick="location.hash='/mixer/mixer-now'"></button>
      </div>
      `;

    return footer;
  }
}

export default Footer;
