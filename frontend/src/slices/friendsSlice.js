import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadUsersToFollow, loadFollowers, loadFollowings } from '../services/api';

const initialState = {
  isOpen: false,
  usersToFollow: ['팔로우 가능한 사용자가 없습니다.'],
  followers: ['팔로워가 없습니다.'],
  followings: ['팔로잉하는 사람이 없습니다.'],
  following: '',
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

export const setFollowings = createAsyncThunk(
  'friends/setFollowings',
  async (userName) => {
    const followings = await loadFollowings(userName);
    return followings;
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
    setFollowing(state, action) {
      return {
        ...state,
        following: action.payload,
      };
    }
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

    [setFollowings.pending]: extraReducerPending(),
    [setFollowings.fulfilled]: (state, action) => {
      return {
        ...state,
        followings: action.payload,
      };
    },
    [setFollowings.rejected]: extraReducerRejected(),
  },
});

export const { setIsOpen, setFollowing } = friendsSlice.actions;

export default friendsSlice.reducer;
