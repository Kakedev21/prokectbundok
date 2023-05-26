import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import touristService from "./touristService";

const tourist = JSON.parse(localStorage.getItem("tourist"));
const toruistGuide = JSON.parse(localStorage.getItem("touristGuide"));

const initialState = {
  userTourist: tourist ? tourist : null,
  bookings: [],
  schedules: [],
  touristprofile: [],
  touristGuide: toruistGuide ? [toruistGuide] : [],
};

export const touristLogin = createAsyncThunk(
  "tourist/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await touristService.loginTourist(formData);
      navigate("/tourist");
      toast.success("Account logined successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const touristLogout = createAsyncThunk("tourist/logout", async () => {
  localStorage.removeItem("tourist");
  localStorage.removeItem("touristGuide");
});

export const touristProfile = createAsyncThunk(
  "tourist/profile",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await touristService.touristProfile(formData);
      toast.success("Profile updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTouristGuide = createAsyncThunk(
  "tourist/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await touristService.getTouristGuide();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDate = createAsyncThunk(
  "tourist/addDate",
  async ({ newDate }, { rejectWithValue }) => {
    try {
      const response = await touristService.addDate(newDate);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClients = createAsyncThunk("tourist/getClients", async () => {
  const response = await touristService.getClients();
  return response.data;
});

export const getSchedule = createAsyncThunk("tourist/getSchedule", async () => {
  const response = await touristService.getSchedule();
  return response.data;
});

const touristSlice = createSlice({
  name: "tourist",
  initialState,
  reducers: {},
  extraReducers: {
    [touristLogin.fulfilled]: (state, action) => {
      state.userTourist = action.payload;
      localStorage.setItem("tourist", JSON.stringify(action.payload));
    },
    [touristProfile.fulfilled]: (state, action) => {
      state.touristprofile = action.payload;
      localStorage.setItem("touristGuide", JSON.stringify(action.payload));
    },
    [getTouristGuide.fulfilled]: (state, action) => {
      localStorage.setItem("touristGuide", JSON.stringify(action.payload));
      state.touristGuide = action.payload;
    },
    [addDate.fulfilled]: (state, action) => {
      state.schedules = action.payload;
    },
    [getClients.fulfilled]: (state, action) => {
      state.bookings = action.payload;
    },
    [getSchedule.fulfilled]: (state, action) => {
      state.schedules = action.payload;
    },
    [touristLogout.fulfilled]: (state) => {
      state.userTourist = null;
    },
  },
});

export default touristSlice.reducer;
