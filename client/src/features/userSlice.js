import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const userData = JSON.parse(localStorage.getItem("user"));
const userBooking = JSON.parse(localStorage.getItem("booking"));

const initialState = {
  user: userData ? userData : null,
  booking: [],
  userBooking: userBooking ? userBooking : [],
  userTourGuide: [],
  userReview: [],
  reviews: [],
};

export const register = createAsyncThunk(
  "user/register",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.register(userData);
      navigate("/booking");
      toast.success("Account registered successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("user");
});

export const login = createAsyncThunk(
  "user/login",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.login(userData);
      navigate("/booking");
      toast.success("Account logined successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUser();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBooking = createAsyncThunk(
  "user/addbooking",
  async (bookingdata, { rejectWithValue }) => {
    try {
      const response = await userService.addBooking(bookingdata);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserBooking = createAsyncThunk(
  "user/getUserBooking",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUserBooking();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTouristGuide = createAsyncThunk(
  "user/getTouristGuide",
  async () => {
    const response = await userService.getTouristGuide();
    return response.data;
  }
);

export const postreview = createAsyncThunk(
  "user/postreview",
  async ({ reviewData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.postreview(reviewData);
      toast.success("Review posted successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviews = createAsyncThunk("user/getReviews", async () => {
  const response = await userService.getReviews();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [addBooking.fulfilled]: (state, action) => {
      state.booking = action.payload;
    },
    [getUserBooking.fulfilled]: (state, action) => {
      state.userBooking = action.payload;
      localStorage.setItem("booking", JSON.stringify(action.payload));
    },
    [getTouristGuide.fulfilled]: (state, action) => {
      state.userTourGuide = action.payload;
    },
    [postreview.fulfilled]: (state, action) => {
      state.userReview = action.payload;
    },
    [getReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { userReset } = userSlice.actions;
export default userSlice.reducer;
