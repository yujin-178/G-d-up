import { clothesData } from '../fixtures/clothesList';
import reducer, {
  setClothes
} from './clothesSlice';

const initialState = {
  clothes: {},
  selectedClothes: clothesData[0],
  loading: false,
  error: null,
};

describe('clothesSlice', () => {
  it('return the initial state', () => {
    expect(reducer(null, {})).toEqual(initialState);
  });
  it('loads initial clothesItems', () => {
    expect(reducer(initialState, setClothes('admin')).clothes).not.toBeNull();
  });
});
