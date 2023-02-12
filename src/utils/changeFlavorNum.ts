import { getFlavorsInMixer } from './getFlavorsInMixer';
import { createHTMLElement } from './createHTMLElement';
import mixerButtonImgSrc from '../assets/images/blender.svg';

export function changeFlavorNumInHeader() {
  const mixerHeader = document.querySelector('.header__mixer');
  if (!mixerHeader) return;
  const flavorsNumInDom = document.querySelector('.header__mixer-number');
  if (getFlavorsInMixer().length !== 0) {
    if (!flavorsNumInDom) mixerHeader.appendChild(createHTMLElement('header__mixer-number', 'div'));
    const flavorsNum = document.querySelector('.header__mixer-number');
    if (!flavorsNum) return;
    flavorsNum.textContent = getFlavorsInMixer().length.toString();
  } else {
    flavorsNumInDom?.remove();
  }
}

export function changeFlavorNumInBrandPageHeader() {
  const mixerImage = document.querySelector('.catalog__mixer-image');
  if (!mixerImage) return;
  const mixerBtn = createHTMLElement('catalog__mixer-image', 'button');
  mixerBtn.style.backgroundImage = `url(${mixerButtonImgSrc})`;
  const flavorsInMixerNum = getFlavorsInMixer().length;
  if (flavorsInMixerNum !== 0) {
    mixerBtn.append(createHTMLElement('catalog__mixer-number', 'div', flavorsInMixerNum.toString()));
  }
  mixerBtn.onclick = () => (location.hash = '/mixer/mixer-now');
  mixerImage.replaceWith(mixerBtn);
}
