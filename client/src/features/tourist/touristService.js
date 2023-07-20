import axios from "axios";

const API_URI = axios.create({
  baseURL: "https://projectbundokapi.onrender.com/tourist",
});

API_URI.interceptors.request.use((req) => {
  if (localStorage.getItem("tourist")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("tourist")).token
    }`;
  }
  return req;
});

const getTourist = () => API_URI.get("/gettourist");
const loginTourist = (formData) => API_URI.post("/logintourist", formData);
const touristProfile = (formData) => API_URI.post("/touristprofile", formData);
const getTouristGuide = () => API_URI.get("/gettouristguide");
const addDate = (newDate) => API_URI.post("/adddate", newDate);
const getClients = () => API_URI.get("/gettourguideclientlist");
const getSchedule = () => API_URI.get("/touristSchedule");

const touristAPI = {
  getTourist,
  loginTourist,
  touristProfile,
  getTouristGuide,
  addDate,
  getClients,
  getSchedule,
};

export default touristAPI;
