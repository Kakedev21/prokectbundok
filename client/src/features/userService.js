import axios from "axios";

const API_URI = axios.create({
  baseURL: "https://projectbundokapi.onrender.com/user",
});

API_URI.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

const getUser = () => API_URI.get("/getuser");
const register = (userData) => API_URI.post("/register", userData);
const login = (userData) => API_URI.post("/login", userData);
const addBooking = (bookingdata) => API_URI.post("/addbook", bookingdata);
const getUserBooking = () => API_URI.get("/userbooking");
const getTouristGuide = () => API_URI.get("/gettouristguide");
const postreview = (reviewdata) => API_URI.put("/postreview", reviewdata);
const getReviews = () => API_URI.get("/getreviews");

const userAPI = {
  register,
  login,
  getUser,
  addBooking,
  getUserBooking,
  getTouristGuide,
  postreview,
  getReviews,
};

export default userAPI;
