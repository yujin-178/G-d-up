import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, authLogin } from '../services/api';

const initialState = {
  isLoggedIn: false,
  userName: '',
  email: '',
  loading: false,
  error: null,
};

export const signin = createAsyncThunk(
  'auth/signin',
  async (payload) => {
    const response = await signIn(payload);
    return response.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload) => {
    const response = await authLogin(payload);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      const category = action.payload;
      return {
        ...state,
        category
      };
    },
    sessionLogin(state, { payload }) {
      return {
        ...state,
        userName: payload
      };
    }
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userName = payload.userName;
      state.email = payload.email;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify({ username: `${payload.userName}` }));
    },
    [signin.rejected]: (state) => {
      state.loading = false;
      alert('이미 존재하는 회원입니다.');
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userName = payload.userName;
      state.email = payload.email;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify({ username: `${payload.userName}` }));
    },
    [login.rejected]: () => {
      alert('아이디와 비밀번호를 확인해주세요.');
    },
  }
});

export const {
  logout,
  sessionLogin,
} = authSlice.actions;

export default authSlice.reducer;
