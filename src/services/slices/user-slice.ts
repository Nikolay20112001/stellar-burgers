import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface IUserState {
  profile: TUser;
  err: string | undefined;
  isInitialized: boolean;
  isReguestLoginApi: boolean;
}

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () =>
  getUserApi()
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (userData: TRegisterData) => await registerUserApi(userData)
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (userData: TRegisterData) => await updateUserApi(userData)
);

export const initialState: IUserState = {
  profile: {
    email: '',
    name: ''
  },
  err: undefined,
  isInitialized: false,
  isReguestLoginApi: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (sliceState) => {
      sliceState.isInitialized = false;
      sliceState.profile = { email: '', name: '' };
    },
    clearErrorUserState: (sliceState) => {
      sliceState.err = undefined;
    }
  },

  selectors: {
    selectUserProfile: (sliceState) => sliceState.profile,
    selectUserProfileName: (sliceState) => sliceState.profile.name,
    selectUserErr: (sliceState) => sliceState.err,
    selectUserIsInitialized: (sliceState) => sliceState.isInitialized,
    selectUserIsRequestLoginApi: (sliceState) => sliceState.isReguestLoginApi
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (sliceState) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchLogin.rejected, (sliceState, action) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchLogin.fulfilled, (sliceState, action) => {
        sliceState.isInitialized = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchLogout.pending, (sliceState) => {
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchLogout.rejected, (sliceState, action) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchLogout.fulfilled, (sliceState) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = false;
      })

      .addCase(fetchGetUser.pending, (sliceState) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchGetUser.rejected, (sliceState, action) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (sliceState, action) => {
        sliceState.isInitialized = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchRegisterUser.pending, (sliceState) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchRegisterUser.rejected, (sliceState, action) => {
        sliceState.isInitialized = false;
        sliceState.isReguestLoginApi = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (sliceState, action) => {
        sliceState.isInitialized = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchUpdateUser.pending, (sliceState) => {
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchUpdateUser.rejected, (sliceState, action) => {
        sliceState.isReguestLoginApi = false;
        sliceState.err = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (sliceState, action) => {
        sliceState.isReguestLoginApi = false;
        sliceState.isInitialized = true;
        sliceState.profile = action.payload.user;
      });
  }
});

export const { logout, clearErrorUserState } = userSlice.actions;

export const {
  selectUserProfile,
  selectUserProfileName,
  selectUserErr,
  selectUserIsInitialized,
  selectUserIsRequestLoginApi
} = userSlice.selectors;

export default userSlice.reducer;
