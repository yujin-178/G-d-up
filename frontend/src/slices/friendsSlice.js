import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import {
  loadUsersToFollow,
  loadFollowers,
  loadFollowings,
  requestFollow,
  requestUnfollow,
} from '../services/api';

const initialState = {
  isOpen: false,
  usersToFollow: [],
  followers: [],
  followings: [],
  searchUserInput: '',
  searchedUsers: [],
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

export const followUser = createAsyncThunk(
  'friends/followUser',
  async ({ following, userName }) => {
    await requestFollow(following, userName);
    return following;
  }
);

export const unfollowUser = createAsyncThunk(
  'friends/unfollowUser',
  async ({ unfollowing, userName }) => {
    await requestUnfollow(unfollowing, userName);
    return unfollowing;
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
    setSearchResult(state, action) {
      if (action.payload.length) {
        return {
          ...state,
          searchUserInput: action.payload,
          searchedUsers: current(state).usersToFollow.filter(user => {
            const len = action.payload.length;
            return (
              action.payload === user.slice(0, len)
            );
          }),
        };
      }
      else {
        return ({
          ...state,
          searchUserInput: action.payload,
          searchedUsers: [],
        });
      }
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

    [followUser.pending]: extraReducerPending(),
    [followUser.fulfilled]: (state, action) => {
      return {
        ...state,
        usersToFollow: state.usersToFollow.filter(user => user != action.payload),
        followings: [...state.followings, action.payload],
      };
    },
    [followUser.rejected]: extraReducerRejected(),

    [unfollowUser.pending]: extraReducerPending(),
    [unfollowUser.fulfilled]: (state, action) => {
      return {
        ...state,
        followings: state.followings.filter(user => user != action.payload),
        usersToFollow: [...state.usersToFollow, action.payload],
      };
    },
    [unfollowUser.rejected]: extraReducerRejected(),
  },
});

export const { setIsOpen, setSearchResult, setFollowing } = friendsSlice.actions;

export default friendsSlice.reducer;
