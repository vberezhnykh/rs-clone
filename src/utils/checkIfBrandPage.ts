const BRANDS = ['brusko', 'chabacco', 'burn', 'darkside', 'must have'];

export function checkIfBrandPage() {
  const locationArr = window.location.hash.split('/');
  console.log(locationArr);
  if (locationArr.length !== 4 || locationArr[0] !== '#' || locationArr[1] !== 'mixer' || locationArr[2] !== 'brands')
    return false;
  return BRANDS.includes(locationArr[3]);
}
