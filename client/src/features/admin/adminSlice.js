import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "../admin/adminService";

const adminUser = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: adminUser ? adminUser : null,
  admins: [],
  bookings: [],
  totalBooking: 0,
  boookingToday: 0,
  monthbooking: [],
  pending: 0,
  rejected: 0,
  approved: 0,
  userList: [],
  adminList: [],
  touristList: [],
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ adminData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await adminService.adminLogin(adminData);
      navigate("/admin");
      toast.success("Account logined successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminLogout = createAsyncThunk("admin/logout", async () => {
  localStorage.removeItem("admin");
});

export const getAdmin = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAdmin();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "admin/add",
  async ({ adminData, toast }, { rejectWithValue }) => {
    try {
      const response = await adminService.addAdmin(adminData);
      toast.success("user created");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookings = createAsyncThunk(
  "admin/adminbookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.allBookings();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingCount = createAsyncThunk(
  "admin/count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.bookingCount();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingToday = createAsyncThunk(
  "admin/today",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.todaybooking();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingMonth = createAsyncThunk(
  "admin/month",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.monthBooking();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const pendingBooking = createAsyncThunk(
  "admin/pending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.pendingBooking();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectBooking = createAsyncThunk(
  "admin/reject",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.rejectBooking();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveBooking = createAsyncThunk(
  "admin/approve",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.approveBooking();
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBooking = createAsyncThunk(
  "admin/bookingstatus",
  async (bookingData) => {
    const response = await adminService.editBooking(bookingData.id, {
      status: bookingData.status,
    });
    return response.data;
  }
);

export const getUserList = createAsyncThunk("admin/userlist", async () => {
  const response = await adminService.getUserList();
  return response.data;
});

export const getAdminList = createAsyncThunk("admin/adminlist", async () => {
  const response = await adminService.getAdminList();
  return response.data;
});

export const getTourGuideList = createAsyncThunk(
  "admin/tourguidelist",
  async () => {
    const response = await adminService.getTourGuideList();
    return response.data;
  }
);

export const addTourist = createAsyncThunk(
  "admin/addtourist",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await adminService.addTourist(formData);
      toast.success("Tourist added successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducer: {},
  extraReducers: {
    [adminLogin.fulfilled]: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    [addAdmin.fulfilled]: (state, action) => {
      state.admins = action.payload;
    },
    [getAdmin.fulfilled]: (state, action) => {
      state.admin = action.payload;
    },
    [adminLogout.fulfilled]: (state, action) => {
      state.admin = null;
    },
    [getBookings.fulfilled]: (state, action) => {
      state.bookings = action.payload;
    },
    [pendingBooking.fulfilled]: (state, action) => {
      state.pending = action.payload;
    },
    [rejectBooking.fulfilled]: (state, action) => {
      state.rejected = action.payload;
    },
    [approveBooking.fulfilled]: (state, action) => {
      state.approved = action.payload;
    },
    [bookingToday.fulfilled]: (state, action) => {
      state.boookingToday = action.payload;
    },
    [bookingMonth.fulfilled]: (state, action) => {
      state.monthbooking = action.payload;
    },
    [bookingCount.fulfilled]: (state, action) => {
      state.totalBooking = action.payload;
    },
    [editBooking.fulfilled]: (state, action) => {
      let { id, status } = action.payload;

      for (let i = 0; i < state.bookings.length; i++) {
        if (state.bookings[i]._id === id) {
          state.bookings[i].status = status;
        }
      }
      state.bookings = [...state.bookings];
    },
    [getUserList.fulfilled]: (state, action) => {
      state.userList = action.payload;
    },
    [getAdminList.fulfilled]: (state, action) => {
      state.adminList = action.payload;
    },
    [getTourGuideList.fulfilled]: (state, action) => {
      state.touristList = action.payload;
    },
    [addTourist.fulfilled]: (state, action) => {
      state.touristList = [...state.touristList, action.payload];
    },
  },
});

export default adminSlice.reducer;
