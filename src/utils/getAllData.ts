import Api from '../components/api/api';
import Preloader from '../components/preloader/preloader';

export async function getAllData() {
  const api = new Api();
  const preloader = new Preloader();
  preloader.draw();
  localStorage.setItem('brands', JSON.stringify(await api.getAllBrands()));
  localStorage.setItem('mixes', JSON.stringify(await api.getAllMixes()));
  localStorage.setItem('flavors', JSON.stringify(await api.getAllFlavors()));
  preloader.removePreloader();
}

export async function isDatabaseOutdated() {
  const api = new Api();
  const preloader = new Preloader();
  preloader.draw();
  const lastTimeUpdated = (await api.getTimeChange()).message;
  const lastTimeUpdatedInLS = getDateFromLS();
  preloader.removePreloader();
  if (!lastTimeUpdatedInLS) return false;
  console.log(lastTimeUpdated, lastTimeUpdatedInLS);
  console.log(lastTimeUpdated > lastTimeUpdatedInLS);
  return lastTimeUpdated > lastTimeUpdatedInLS;
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
