import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    MSSV: '',
    access_token: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, MSSV, access_token } = action.payload;
            state.name = name;
            state.MSSV = MSSV;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = '';
            state.MSSV = '';
            state.access_token = '';
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer