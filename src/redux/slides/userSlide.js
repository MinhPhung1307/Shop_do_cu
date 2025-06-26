import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, isAdmin } = action.payload;
            state.name = name;
            state.email = email;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.isAdmin = false;
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer