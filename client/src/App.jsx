import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminBookings from "./pages/AdminBookings";
import TouristLogin from "./pages/TouristLogin";
import NotFound from "./pages/NotFound";
import Tourist from "./pages/Tourist";
import TouristProfile from "./pages/TouristProfile";
import TouristProfileSection from "./components/TouristProfileSection";
import TouristSchedule from "./pages/TouristSchedule";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminManagement from "./pages/AdminManagement";
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/userpage",
      element: <UserPage />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/adminbooking",
      element: <AdminBookings />,
    },
    {
      path: "/touristlogin",
      element: <TouristLogin />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/tourist",
      element: <Tourist />,
    },
    {
      path: "/touristprofile",
      element: <TouristProfile />,
    },
    {
      path: "/touristprofilesection",
      element: <TouristProfileSection />,
    },
    {
      path: "/touristschedule",
      element: <TouristSchedule />,
    },
    {
      path: "/adminusers",
      element: <AdminUsersPage />,
    },
    {
      path: "/adminmanagement",
      element: <AdminManagement />,
    },
    {
      path: "/review",
      element: <Review />,
    },
    {
      path: "/reviews",
      element: <Reviews />,
    },
  ]);

  return (
    <main>
      <RouterProvider router={routes} />
      <ToastContainer />
    </main>
  );
}

export default App;
