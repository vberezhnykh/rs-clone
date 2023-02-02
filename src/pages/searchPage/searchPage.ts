import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
const searchimg = require('../../assets/images/search.svg');
const starempty = require('../../assets/images/star-empty.svg');

class SearchPage implements InterfaceContainerElement {
  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');

    main.innerHTML = `
    <div class="main__container container">
      <div class="search">
        <div class="search__inner">
          <img src="${searchimg}" alt="search" height="32">
          <input type="text" class="search__input" placeholder="Бренд, микс, вкус">
        </div>
      </div>
      
      <div class="tabs">
          <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked>
          <label for="tab-btn-1">Вкусы</label>
          <input type="radio" name="tab-btn" id="tab-btn-2" value="">
          <label for="tab-btn-2">Миксы</label>
          <input type="radio" name="tab-btn" id="tab-btn-3" value="">
          <label for="tab-btn-3">Бренды</label>
          <input type="radio" name="tab-btn" id="tab-btn-4" value="">
          <label for="tab-btn-4">Подборки</label>
        <div id="tastes">
          <div class="tastes-list">
            <div class="tastes-list__item">
              <div class="brand-name">Black Burn</div>
              <div class="taste-name">Something Berry (Что-то Ягодное)</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Black Burn</div>
              <div class="taste-name">Tropic Jack</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Banger</div>
              <div class="taste-name">Cherry Plum</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Burn</div>
              <div class="taste-name">Flower &amp; Honey</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Tangier's</div>
              <div class="taste-name">Blue Flower</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Tangier's</div>
              <div class="taste-name">Marigold (Seasonal)</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Eleon</div>
              <div class="taste-name">Blue Misterio</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Black Burn</div>
              <div class="taste-name">Something Fresh</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Al Fakher</div>
              <div class="taste-name">Fresh Flavor</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">DarkSide</div>
              <div class="taste-name">Центральный бит</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Tangier's</div>
              <div class="taste-name">Lemon Blossom</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Tangier's</div>
              <div class="taste-name">Prince of Gray</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Jam</div>
              <div class="taste-name">Спелая Маракуйя</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Jam</div>
              <div class="taste-name">Спелая Фейхоа</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Северный</div>
              <div class="taste-name">Свежий Бабл</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Serbetli</div>
              <div class="taste-name">ICE-BODRUM TANGERINE (СВЕЖИЙ МАНДАРИН СО ЛЬДОМ)</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Serbetli</div>
              <div class="taste-name">BODRUM TANGERINE (СВЕЖИЙ МАНДАРИН)</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Serbetli</div>
              <div class="taste-name">FRESH POWER (СВЕЖАЯ ЭНЕРГИЯ)</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Северный</div>
              <div class="taste-name">Север</div>
            </div>
            <div class="tastes-list__item">
              <div class="brand-name">Serbetli</div>
              <div class="taste-name">SOURSOP (СМЕТАННОЕ ЯБЛОКО)</div>
            </div>
          </div>
        </div>
        <div id="mixes">
          <div class="mixes-list">
            <div class="mixes-list__cards">
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder6.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Medium
                      Redberry / Black Currant / Medium Barvy Citrus / Medium Polar Cream</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/Mix/users/Mix/users/mix_xXGESrz.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Свежая
                      клубника</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/Mix/users/Mix/users/mix_YFHGF3W.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Тропический
                      бренди</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img
                  src="https://hookahapp.ru/Images/Mix/users/Mix/users/image_20220302_205525_2221441036225768819.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Цветочный
                      отвар</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder3.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span id="mixes-list__title-span-id"
                      class="mixes-list__title-span">кисло-сладко-свежий виноград</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder4.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Medium
                      Cosmo Flower / Medium Blueberry Blast / Grapefruit / Rare Grape Core</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder4.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Цветочный
                      ананас</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">4.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder2.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>кисло
                      свежий кайф</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img src="https://hookahapp.ru/Images/MixOld/mixPlaceholder8.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>свежая
                      дыня</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img
                  src="https://hookahapp.ru/Images/Mix/users/image_20220825_194132_6715037461538863279.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Очень
                      свежий</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img
                  src="https://hookahapp.ru/Images/Mix/users/Mix/users/image_20211001_211259_7143178088290625338.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>Свежая
                      кола</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">-</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mixes-list__card"><img
                  src="https://hookahapp.ru/Images/Mix/users/56023BD5-26F1-4F13-BF70-A7B07284253C.jpg"
                  class="mixes-list__card-img">
                <div class="mixes-list__card-container">
                  <div class="mixes-list__title"><span>50 оттенков
                      серого</span></div>
                  <div class="mixes-list__card-footer">
                    <div class="mixes-list__button"><button
                        class="button button-1"><span
                          class="mixes-list__button-text">Пробовать</span></button></div>
                    <div class="mixes-list__marks">
                      <div class="mixes-list__like">
                        <div><img src="${starempty}" alt="star"></div>
                        <div class="mixes-list__rate">5.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div id="brands">
          
          <div class="brands-list">
            <div class="brands-list__item">
              <img src="https://hookahapp.ru/Images/Brand/duft.jpg" alt="brand-name">
              <div class="brands-list__item-container">
                <div class="brand-name">Duft</div>
                <div class="taste-count">40 вкусов</div>
              </div>
            </div>
            <div class="brands-list__item">
              <img src="https://hookahapp.ru/Images/Brand/duft.jpg" alt="brand-name">
              <div class="brands-list__item-container">
                <div class="brand-name">Duft</div>
                <div class="taste-count">40 вкусов</div>
              </div>
            </div>
            <div class="brands-list__item">
              <img src="https://hookahapp.ru/Images/Brand/duft.jpg" alt="brand-name">
              <div class="brands-list__item-container">
                <div class="brand-name">Duft</div>
                <div class="taste-count">40 вкусов</div>
              </div>
            </div>
            <div class="brands-list__item">
              <img src="https://hookahapp.ru/Images/Brand/duft.jpg" alt="brand-name">
              <div class="brands-list__item-container">
                <div class="brand-name">Duft</div>
                <div class="taste-count">40 вкусов</div>
              </div>
            </div>
            <div class="brands-list__item">
              <img src="https://hookahapp.ru/Images/Brand/duft.jpg" alt="brand-name">
              <div class="brands-list__item-container">
                <div class="brand-name">Duft</div>
                <div class="taste-count">40 вкусов</div>
              </div>
            </div>
          </div>

        </div>
        <div id="collection">
          
          <div class="collection-list">
            <div class="collection-list__item">
              <div class="collection-name">Свежий Vozduh</div>
              <div class="collcetion-desc">Миксы на все случаи жизни от Макса - кальянного гуру Vozduh Lounge Bar</div>
            </div>
            <div class="collection-list__item">
              <div class="collection-name">Свежий Vozduh</div>
              <div class="collcetion-desc">Миксы на все случаи жизни от Макса - кальянного гуру Vozduh Lounge Bar</div>
            </div>


          </div>
          

        </div>
      </div>














    </div>
    `;

    return main;
  }
}

export default SearchPage;
