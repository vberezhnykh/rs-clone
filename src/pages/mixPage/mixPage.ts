import { createHTMLElement } from '../../utils/createHTMLElement';
import { InterfaceContainerElement } from '../../components/types/types';
import starempty from '../../assets/images/star-empty.svg';
import info from '../../assets/images/info.svg';
import cancel from '../../assets/images/cancel.svg';
import { initSlider } from '../../components/slider/slider';
import { onResizeSlider } from '../../components/slider/slider';
import Chart from 'chart.js/auto';
import '../../../node_modules/chartjs-plugin-outerlabels';


class MixPage implements InterfaceContainerElement {
  
  private switcher=():void=>{
    if((<HTMLInputElement>document.querySelector('#switch')).checked)
      (<HTMLElement>document.querySelector('.mix-card__buttons-row')).style.display='flex';
    else
    (<HTMLElement>document.querySelector('.mix-card__buttons-row')).style.display='none';
  }
  private popup=(e:Event):void=>{
    if((<HTMLElement>e.target).classList.contains('more')){
      const index= Array.from(document.querySelectorAll('.more')).indexOf(e.target as HTMLElement);
      (<HTMLElement>document.querySelector('.popup-taste')).style.display='block';
    }
    else if((<HTMLElement>e.target).classList.contains('popup-taste__img-cancel')){
      (<HTMLElement>document.querySelector('.popup-taste')).style.display='none';
    }
  }
  private doughnutChart = (): void => {
    const ctx = document.getElementById('myChart');
    const colorsArray=['#06a396','#fa320a','#f6bc25','#202d91','#f96509','#987e41','#914198'];
    // ,'#f96509','#987e41','#914198'
    const labels=['Cola','Cola','Cola'];
    const colors=[];
    for(let i:number=0;i<labels.length;i++){
      if(i<colorsArray.length)colors.push(colorsArray[i]);
      else colors.push('#'+(Math.random() * 0x1000000 | 0x1000000).toString(16).slice(1));
    }
    
    new Chart(<HTMLCanvasElement>ctx, {
      type: 'doughnut',
      data:  {
        labels: labels,
        datasets: [{
          // label: 'My First Dataset',
          data: [30, 50, 20],
          backgroundColor: colors,
          // hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          outerLabels: {
            fontNormalSize: 18,
            fontNormalColor: '#FFFFFF',
            fontBoldSize: 18,
            fontBoldColor: '#FFFFFF',
            twoLines: true,
            offset: 20,
            formatter: n => `${n.value+'%'} ${n.label}`,
            // debug: true,
          },
          tooltip: {
            enabled: false,
          },
          legend: {
            display:false,
          },
          
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        
        layout: {
          padding: 50,
        },
        events: [],
      },
    });
    
  };




  draw(): HTMLElement {
    const main = createHTMLElement('main', 'main');
    let components='';
    for (let i:number=0;i<3;i++){
      components+=`<div class="component">
      <div class="component__container">
        <img src="https://hookahapp.ru/Images/Tobacco/Содовая.jpg" width="96" height="96" alt="component-name">
        <div class="component__info">
          <div class="component__title">Cola</div>
          <div class="component__must"><button class="button button-2">MUST HAVE</button></div>
        </div>
        <div class="component__more"><img src="${info}" class="more" height="32" width="32"></div>
      </div>
      <div class="component__quantity">
          
      <div class="tick-slider">
      <div class="tick-slider-value-container">
          <div id="component${i+1}LabelMin" class="tick-slider-label">0</div>
          <div id="component${i+1}LabelMax" class="tick-slider-label">100</div>
          <div id="component${i+1}Value" class="tick-slider-value"></div>
      </div>
      <div class="tick-slider-background"></div>
      <div id="component${i+1}Progress" class="tick-slider-progress"></div>
      <div id="component${i+1}Ticks" class="tick-slider-tick-container"></div>
      <input
          id="component${i+1}Slider"
          class="tick-slider-input"
          type="range"
          min="0"
          max="100"
          step="1"
          value="30"
          data-tick-id="component${i+1}Ticks"
          data-value-id="component${i+1}Value"
          data-progress-id="component${i+1}Progress"
          data-handle-size="18"
          data-min-label-id="component${i+1}LabelMin"
          data-max-label-id="component${i+1}LabelMax">
  </div>
  </div> 
  </div>`;
    }

    main.innerHTML = `
    <div class="main__container container">

      <div class="mix-card">
        
        <div class="mix-card__img">
          <img src="https://hookahapp.ru/Images/Mix/users/Mix/users/image_20220822_093412_5005673308501549130.jpg" alt="name" width="220" height="220">
        </div>
        <div class="mix-card__container">
          <h1 class="mix-card__title">Холодная кола с корицей</h1>
          <div class="mix-card__desc">Освежающая кока-кола с пряной корицей ( Must Have )</div>
          <div class="mix-card__more-info">
            <div class="mix-card__rating-row">
              <div class="mix-card__stars">
                <img src="${starempty}" alt="star">
                <img src="${starempty}" alt="star">
                <img src="${starempty}" alt="star">
                <img src="${starempty}" alt="star">
                <img src="${starempty}" alt="star">
              </div>
              <div class="mix-card__rating">5.0</div>
            </div>
            <div class="mix-card__strength-row">
              <div><span>Крепость</span></div>
              <div class="mix-card__strength">Средний</div>
            </div>
            <div class="mix-card__calc-row">
              <div><span>Расчитать в граммах</span></div>
              <div class="calc"><input type="checkbox" id="switch"/><label for="switch">Toggle</label></div>
            </div>
            <div class="mix-card__buttons-row">
              <button class="button button-2 active">20 г.</button>
              <button class="button button-2">25 г.</button>
              <button class="button button-2">30 г.</button>
            </div>
          </div>
        </div>
      </div>

      <div id="tabs-mix" class="tabs">
        <input type="radio" name="tab-btn" id="tab-mix-btn-1" value="" checked>
        <label for="tab-mix-btn-1">Компонеты</label>
        <input type="radio" name="tab-btn" id="tab-mix-btn-2" value="">
        <label for="tab-mix-btn-2">Диаграмма</label>
        <div id="composition">${components}
          
          


          





          


        </div>
        <div id="diagram">
          <div class="compotion-chart">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>


    <div class="popup-taste">
      <div class="popup-taste__inner">
        <img src="https://hookahapp.ru/Images/Tobacco/Содовая.jpg" class="popup-taste__img">
        <img src="${cancel}" class="popup-taste__img-cancel">
        <div class="popup-tase__info">
          <div class="popup-taste__title">Cola</div>
          <div class="popup-taste__desc">Стоит ли описывать, на что это похоже?</div>
          <div class="popup-tase__must"><button class="button button-2">MUST HAVE</button></div>
        </div>
        <div class="popup-taste__buttons">
        <button class="button button-3">Добавить в миксер</button>
        <button class="button button-3">Подобрать миксы со вкусом</button>
        </div>
      </div>
    </div>

    </div>
    `;
    
    main.addEventListener('click',this.popup);
    setTimeout(()=>{
      initSlider();
      this.doughnutChart();
      document.querySelector('#switch')?.addEventListener('click',this.switcher);
      
      
    
    
    },0);
    return main;
  }
  
}

export default MixPage;
