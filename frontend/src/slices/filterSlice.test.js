import reducer, {
  changeCategoryFilter,
  changeIsUserItemFilter,
  changeSeasonFilter,
  changeColorFilter,
  addCustomFilter,
  deleteCustomFilter,
} from './filterSlice';

const initialState = {
  category: '전체',
  isUserItem: false,
  selectedSeason: [],
  selectedColors: [],
  custom: [],
};

describe('filter Reducers', () => {
  it('return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('change category when action is: changeCategoryFilter', () => {
    expect(reducer(initialState, changeCategoryFilter('상의'))).toEqual({
      category: '상의',
      isUserItem: false,
      selectedSeason: [],
      selectedColors: [],
      custom: [],
    });
  });

  it('change isUsername when action is: changeIsUserItemFilter', () => {
    expect(reducer(initialState, changeIsUserItemFilter(true))).toEqual({
      category: '전체',
      isUserItem: true,
      selectedSeason: [],
      selectedColors: [],
      custom: [],
    });
  });

  it('change selectedSeason when action is: changeSeasonFilter', () => {
    expect(reducer(initialState, changeSeasonFilter({ isChecked: true, season: '봄' }))).toEqual({
      ...initialState,
      selectedSeason: ['봄'],
    });

    const previous = {
      category: '전체',
      isUserItem: true,
      selectedSeason: ['봄', '여름'],
      selectedColors: [],
      custom: [],
    };

    expect(reducer(previous, changeSeasonFilter({ isChecked: false, season: '여름' }))).toEqual({
      ...previous,
      selectedSeason: ['봄'],
    });
  });
});

it('change selectedColors when action is: changeSeasonFilter', () => {
  expect(reducer(initialState, changeColorFilter('red'))).toEqual({
    ...initialState,
    selectedColors: ['red'],
  });

  const previous = {
    ...initialState,
    selectedColors: ['red', 'black'],
  };

  expect(reducer(previous, changeColorFilter('black'))).toEqual({
    ...previous,
    selectedColors: ['red'],
  });
});

it('add custom element when action is: addCustomFilter', () => {
  expect(reducer(initialState, addCustomFilter('데일리'))).toEqual({
    ...initialState,
    custom: ['데일리'],
  });

  const previous = {
    ...initialState,
    custom: ['데일리'],
  };

  expect(reducer(previous, addCustomFilter('데일리'))).toEqual(previous);
  expect(reducer(previous, addCustomFilter('잠옷'))).toEqual({
    ...previous,
    custom: ['데일리', '잠옷'],
  });
});

it('delete custom element when action is: deleteCustomFilter', () => {
  expect(reducer(initialState, deleteCustomFilter('데일리'))).toEqual(initialState);

  const previous = {
    ...initialState,
    custom: ['데일리'],
  };

  expect(reducer(previous, deleteCustomFilter('데일리'))).toEqual(initialState);
});
