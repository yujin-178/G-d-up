import { filteredClothesSelector } from './filterSelector';
import { clothesData } from './fixtures/clothesList';
const mockStore= (category='전체', selectedSeason=[], selectedColors=[], custom=[]) => ({
  clothesSlice: {
    clothes: clothesData,
    selectedClothes: clothesData[0],
    loading: false,
    error: null,
  },
  filterSlice: {
    category,
    isUserItem: false,
    selectedSeason,
    selectedColors,
    custom,
  },
});

describe('filteredClothesSelector', () => {

  it('returns filtered clothes 전체', () => {
    expect(filteredClothesSelector(mockStore())).toEqual(clothesData);
  });

  it('returns filtered clothes 상의', () => {
    const state = mockStore('상의');
    expect(filteredClothesSelector(state)).toHaveLength(2);
  });

  it('returns filtered clothes 봄', () => {
    const state = mockStore('전체', ['여름']);
    expect(filteredClothesSelector(state)).toHaveLength(2);
  });

  it('returns filtered clothes 봄, 여름', () => {
    const state = mockStore('전체', ['봄', '여름']);
    expect(filteredClothesSelector(state)).toHaveLength(2);
  });

  it('returns filtered clothes red', () => {
    const state = mockStore('전체', [], ['red']);
    expect(filteredClothesSelector(state)).toHaveLength(1);
  });

  it('returns filtered clothes black', () => {
    const state = mockStore('전체', [], ['black']);
    expect(filteredClothesSelector(state)).toHaveLength(2);
  });

  it('returns filtered clothes red or black', () => {
    const state = mockStore('전체', [], ['red', 'black']);
    expect(filteredClothesSelector(state)).toHaveLength(3);
  });

  it('returns filtered clothes with custom tag 데일리', () => {
    const state = mockStore('전체', [], [], ['데일리']);
    expect(filteredClothesSelector(state)).toHaveLength(3);
  });

  it('returns filtered clothes with custom tag 출근', () => {
    const state = mockStore('전체', [], [], ['출근']);
    expect(filteredClothesSelector(state)).toHaveLength(2);
  });

  it('returns filtered clothes with custom tag 출근, 데일리', () => {
    const state = mockStore('전체', [], [], ['출근', '데일리']);
    expect(filteredClothesSelector(state)).toHaveLength(1);
  });
});
