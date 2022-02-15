import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadUsersToFollow, loadFollowers } from '../services/api';

const initialState = {
  isOpen: false,
  usersToFollow: ['팔로우 가능한 사용자가 없습니다.'],
  followers: ['팔로워가 없습니다.'],
};

export const setUsersToFollow = createAsyncThunk(
  'friends/setUsersToFollow',
  async (userName) => {
    const usersToFollow = await loadUsersToFollow(userName);
    return usersToFollow;
  }
);

export const setFollowers = createAsyncThunk(
  'friends/setFollowers',
  async (userName) => {
    const followers = await loadFollowers(userName);
    return followers;
  }
);

function extraReducerPending() {
  return (
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  );
}

function extraReducerRejected() {
  return (
    (state) => {
      return {
        ...state,
        loading: false,
        error: '오류가 발생했습니다.',
      };
    }
  );
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
  extraReducers: {
    [setUsersToFollow.pending]: extraReducerPending(),
    [setUsersToFollow.fulfilled]: (state, action) => {
      return {
        ...state,
        usersToFollow: action.payload,
      };
    },
    [setUsersToFollow.rejected]: extraReducerRejected(),

    [setFollowers.pending]: extraReducerPending(),
    [setFollowers.fulfilled]: (state, action) => {
      return {
        ...state,
        followers: action.payload,
      };
    },
    [setFollowers.rejected]: extraReducerRejected(),
  },
});

export const { setIsOpen } = friendsSlice.actions;

export default friendsSlice.reducer;
