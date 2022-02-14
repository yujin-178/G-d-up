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
    },
    [signin.rejected]: (state) => {
      state.loading = false;
      state.error = '회원가입에 실패했습니다.';
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userName = payload.userName;
      state.email = payload.email;
    },
    [login.rejected]: (state) => {
      state.error = '아이디와 비밀번호를 확인해주세요.';
    },
  }
});

export const {
  logout
} = authSlice.actions;

export default authSlice.reducer;
