import { createSlice } from '@reduxjs/toolkit';


import { addUserBalance, getCurrentUserInfo, logOutUser, loginUser, registerUser } from './authOperations';

const fulfilledOperation = (state) => {
  state.isLoading = false;
  state.isLoggedIn = true;
  state.error = null;
}

const initialState = {
    user: { name: null, email: null },
    token: null,
    balance: 0,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  }

const authSlice = createSlice({
  name: 'auth',

  initialState,

  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        fulfilledOperation(state);
        state.token = payload.token;
        state.user.name = payload.newUser.name;
        state.user.email = payload.newUser.email;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        fulfilledOperation(state);
        state.token = payload.token;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, { payload }) => {
        fulfilledOperation(state);
        state.balance = payload.user?.balance;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
      })
      .addCase(logOutUser.fulfilled, (state, _) => {
        return initialState;
      })
      .addCase(addUserBalance.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
      })
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('auth') && action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export default authSlice.reducer;