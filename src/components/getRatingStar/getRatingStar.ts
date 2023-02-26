import ratingStarIconSrc from '../../assets/images/star-empty.svg';
import ratingGoldStarIconSrc from '../../assets/images/star-gold.svg';
import { Rates } from '../types/types';

export default function getRatingStar(id: number) {
  const checkRatesinLS = localStorage.getItem('blenderStartProfile');
  if (checkRatesinLS) {
    const getRates = (<Rates>JSON.parse(checkRatesinLS).rating).map((e) => e.id);
    if (getRates.includes(id)) {
      return ratingGoldStarIconSrc;
    } else {
      return ratingStarIconSrc;
    }
  }
}
