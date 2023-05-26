import axios from "axios";

const API_URI = axios.create({ baseURL: "http://localhost:8080/admin" });

API_URI.interceptors.request.use((req) => {
  if (localStorage.getItem("admin")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("admin")).token
    }`;
  }
  return req;
});

//account
const getAdmin = () => API_URI.get("/getadmin");
const addAdmin = (adminData) => API_URI.post("/addadmin", adminData);
const adminLogin = (adminData) => API_URI.post("/adminlogin", adminData);

//booking
const allBookings = () => API_URI.get("/bookings");
const bookingCount = () => API_URI.get("/countbooking");
const todaybooking = () => API_URI.get("/todaybooking");
const monthBooking = () => API_URI.get("/bookingmonth");
const pendingBooking = () => API_URI.get("/pending");
const rejectBooking = () => API_URI.get("/reject");
const approveBooking = () => API_URI.get("/approve");
const getUserList = () => API_URI.get("/getusers");
const getAdminList = () => API_URI.get("/getadmins");
const getTourGuideList = () => API_URI.get("/gettourguides");
const editBooking = (id, booking) => {
  return API_URI.put(`/editbook/${id}`, booking);
};

//tourist
const addTourist = (formData) => API_URI.post("/addtourist", formData);

const adminAPI = {
  getAdmin,
  addAdmin,
  adminLogin,
  allBookings,
  bookingCount,
  todaybooking,
  monthBooking,
  pendingBooking,
  rejectBooking,
  approveBooking,
  editBooking,
  getUserList,
  getAdminList,
  getTourGuideList,
  addTourist,
};

export default adminAPI;
