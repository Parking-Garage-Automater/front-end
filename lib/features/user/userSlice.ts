import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: string;
    licenseno: string;
    paymentHistory: string[];
    balance: number;
    profileURL: string;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: { id: 'nacroptic', licenseno: 'A123', paymentHistory: [], balance: 10, profileURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;