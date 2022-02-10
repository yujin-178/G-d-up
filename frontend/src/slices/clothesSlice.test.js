import { clothesData } from '../../fixtures/clothesList';
import reducer, {

} from './clothesSlice';

const initialState = {
  clothes: clothesData,
  selectedClothes: clothesData[0],
  loading: false,
  error: null,
};

describe('clothesSlice', () => {
  it('return the initial state', () => {
    expect(reducer(null, {})).toEqual(initialState);
  });
});
