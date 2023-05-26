import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import adminReducer from "../features/admin/adminSlice";
import touristReducer from "../features/tourist/touristSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    tourist: touristReducer,
  },
});
