import Api from '../components/api/api';
import Preloader from '../components/preloader/preloader';

export async function getAllData() {
  const api = new Api();
  localStorage.setItem('brands', JSON.stringify(await api.getAllBrands()));
  localStorage.setItem('mixes', JSON.stringify(await api.getAllMixes()));
  localStorage.setItem('flavors', JSON.stringify(await api.getAllFlavors()));
  localStorage.setItem('lastDbUpdateTime', Date.now().toString());
}

export async function isDatabaseOutdated() {
  const api = new Api();
  const preloader = new Preloader();
  preloader.draw();
  const lastTimeUpdated = new Date((await api.getTimeChange()).message);
  const lastTimeUpdatedInLS = getDateFromLS();
  preloader.removePreloader();
  if (!lastTimeUpdatedInLS) return false;
  return lastTimeUpdated >= lastTimeUpdatedInLS;
}

function getDateFromLS() {
  const lastTimeUpdatedInLS = localStorage.getItem('lastDbUpdateTime');
  if (!lastTimeUpdatedInLS) return;
  return new Date(JSON.parse(lastTimeUpdatedInLS));
}

export function isDataInLocalStorage() {
  return (
    localStorage.getItem('brands') !== null &&
    localStorage.getItem('flavors') !== null &&
    localStorage.getItem('mixes') !== null
  );
}
