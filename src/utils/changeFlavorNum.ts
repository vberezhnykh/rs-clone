import { getFlavorsInMixer } from './getFlavorsInMixer';
import { createHTMLElement } from './createHTMLElement';
import mixerButtonImgSrc from '../assets/images/blender.svg';

function changeFlavorNum(className: string) {
  const mixer = document.querySelector(`.${className}__mixer`);
  if (!mixer) return;
  const flavorsNumInDom = document.querySelector(`.${className}__mixer-number`);
  const flavorsInMixerNum = getFlavorsInMixer().length;
  if (flavorsInMixerNum !== 0) {
    if (!flavorsNumInDom) mixer.appendChild(createHTMLElement(`${className}__mixer-number`, 'div'));
    const flavorsNum = document.querySelector(`.${className}__mixer-number`);
    if (!flavorsNum) return;
    flavorsNum.textContent = flavorsInMixerNum.toString();
  } else {
    flavorsNumInDom?.remove();
  }
}

export function changeFlavorNumInHeader() {
  changeFlavorNum('header');
  /* const mixerHeader = document.querySelector('.header__mixer');
  if (!mixerHeader) return;
  const flavorsNumInDom = document.querySelector('.header__mixer-number');
  const flavorsInMixerNum = getFlavorsInMixer().length;
  if (flavorsInMixerNum !== 0) {
    if (!flavorsNumInDom) mixerHeader.appendChild(createHTMLElement('header__mixer-number', 'div'));
    const flavorsNum = document.querySelector('.header__mixer-number');
    if (!flavorsNum) return;
    flavorsNum.textContent = flavorsInMixerNum.toString();
  } else {
    flavorsNumInDom?.remove();
  } */
}

export function changeFlavorNumInFooter() {
  changeFlavorNum('footer');
  /* const mixerFooter = document.querySelector('.footer__mixer-image');
  if (!mixerFooter) return;
  const flavorsNumInDom = document.querySelector('.footer__mixer-number');
  if (getFlavorsInMixer().length !== 0) {
    if (!flavorsNumInDom) mixerFooter.appendChild(createHTMLElement('footer__mixer-number', 'div'));
    const flavorsNum = document.querySelector('.footer__mixer-number');
    if (!flavorsNum) return;
    flavorsNum.textContent = getFlavorsInMixer().length.toString();
  } else {
    flavorsNumInDom?.remove();
  } */
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
  mixerBtn.onclick = () => {
    location.hash =
      decodeURI(window.location.hash.split('/')[1]) === 'create-new'
        ? '/create-new/mixer/mixer-now'
        : '/mixer/mixer-now';
  };
  mixerImage.replaceWith(mixerBtn);
}

export function handleChangeOfFlavorsInMixer() {
  changeFlavorNumInHeader();
  changeFlavorNumInBrandPageHeader();
  changeFlavorNumInFooter();
}
