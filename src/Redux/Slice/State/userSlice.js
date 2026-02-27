import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        name: "",
        email: "",
        phone: "",
        password: ""
    },
    users:[],
 }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action){
        state.user = {...state.user, ...action.payload}
    },
    setUsersList(state, action){
        state.users = [...state.users, action.payload]
    },
    deleteUser(state, actions){
        state.users = actions.payload
    }
  },
});

export const { setUser, setUsersList, deleteUser} = userSlice.actions
export default userSlice.reducer;