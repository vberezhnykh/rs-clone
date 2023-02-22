import Api from '../components/api/api';
import { getDataFromLS } from './getAllData';
import * as _ from 'lodash';
import { Mixes } from '../components/types/types';

type MixWeek = {
  lastUpdate: number;
  number: number;
};

const MS_IN_HOUR = 60000 * 60;

export function handleMixWeek() {
  setInterval(() => {
    const MixWeek = getMixWeek() ?? setMixWeek();
    if (!MixWeek) return;
    const now = Date.now();
    if (now - (MixWeek as MixWeek).lastUpdate < MS_IN_HOUR) return;
    setMixWeek();
  }, 10000);
}

function getMixWeek(): MixWeek | null {
  const itemInStorage = localStorage.getItem('MixWeek');
  return itemInStorage ? JSON.parse(itemInStorage) : null;
}

async function setMixWeek() {
  const id = await getRandomMixNumber();
  addToLocalStorage(id);
}

function addToLocalStorage(id?: number) {
  localStorage.setItem(
    'MixWeek',
    JSON.stringify({
      lastUpdate: Date.now(),
      id: id ? id : 1,
    })
  );
}

async function getRandomMixNumber() {
  const api = new Api();
  const mixes = getDataFromLS('mixes') ?? (await api.getAllMixes());
  if (!mixes) return;
  return (mixes as Mixes)[_.random(0, mixes.length - 1)].id;
}
