import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store.ts";
import {IUser} from "../../types/type.ts";


// Define a type for the slice state
interface IUserState {
    user: IUser | null
    isAuth: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logOut: (state) => {
            state.isAuth = false
            state.user = null
        }
    },
})

export const {logIn,logOut} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
