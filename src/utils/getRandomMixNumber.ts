import Api from '../components/api/api';

export async function getRandomMixNumber() {
  const api = new Api();
  const mixes = await api.getAllMixes();
  const mixesId = mixes.map((mix) => mix.id);
  const min = 0; // Math.ceil(min);
  const max = mixesId.length - 1; // Math.floor(max);
  const randomId = Math.floor(Math.random() * (max - min + 1) + min);
  return mixesId[randomId].toString();
}
