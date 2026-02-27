import {configureStore} from "@reduxjs/toolkit"

import userReducer from "../Slice/State/userSlice"
export const store = configureStore ({
    reducer:{
        user:userReducer,
    }
})
