import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const authSlice = createSlice({
	name : "auth",
	initialState : false,
	reducers : {
		login : (state, action) => {
			return state = true;
		 },
		logout : (state, action) => {
			return state = false
		}
	}
})

export const auth = authSlice.reducer;
export const { login, logout } = authSlice.actions;