import Api from '../components/api/api';
import preloader from '../components/preloader/preloader';

export async function isBrandPage() {
  const loader = new preloader();
  loader.draw();
  const BRANDS = (await new Api().getAllBrands()).map((brand) => brand.name.toLowerCase());
  const locationArr = window.location.hash.split('/');
  loader.removePreloader();
  if (locationArr.length !== 4 || locationArr[0] !== '#' || locationArr[1] !== 'mixer' || locationArr[2] !== 'brands')
    return false;
  return BRANDS.includes(locationArr[3].replace('%20', ' '));
}
