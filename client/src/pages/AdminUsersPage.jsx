import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminUsers from "../components/AdminUsers";
import AdminList from "../components/AdminList";
import TouristList from "../components/TouristList";
import AdminForm from "../components/AdminForm";
import TouristForm from "../components/TouristForm";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getUserList,
  getAdminList,
  getTourGuideList,
} from "../features/admin/adminSlice";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { admin, userList, adminList, touristList } = useSelector(
    (state) => state.admin
  );

  console.log(touristList);

  useEffect(() => {
    if (!admin) {
      navigate("/adminlogin");
    }
    if (admin) {
      dispatch(getUserList());
      dispatch(getAdminList());
      dispatch(getTourGuideList());
    }
  }, []);

  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showAddTouristForm, setShowAddTouristForm] = useState(false);

  const handleShowAddAdminForm = () => {
    setShowAddAdminForm(true);
    setShowAddTouristForm(false);
  };

  const handleShowAddTouristForm = () => {
    setShowAddTouristForm(true);
    setShowAddAdminForm(false);
  };

  const handleCloseAddAdminForm = () => {
    setShowAddAdminForm(false);
  };

  const handleCloseAddTouristForm = () => {
    setShowAddTouristForm(false);
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-white h-screen w-full p-10">
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowAddAdminForm}
              >
                Add New Admin
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowAddTouristForm}
              >
                Add New Tourist
              </button>
            </div>
            {showAddAdminForm && (
              <>
                <div>
                  <AdminForm />
                  <button
                    onClick={() => setShowAddAdminForm(false)}
                    className="mt-3 text-center bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
            {showAddTouristForm && (
              <>
                <div>
                  <TouristForm />
                  <button
                    onClick={() => setShowAddTouristForm(false)}
                    className="mt-3 text-center bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="flex space-x-4">
            <button
              className={`${
                activeTab === "users"
                  ? "bg-[#00796B] text-white"
                  : "bg-gray-300"
              } py-2 px-4 rounded-md`}
              onClick={() => handleTabClick("users")}
            >
              Users
            </button>
            <button
              className={`${
                activeTab === "admin"
                  ? "bg-[#00796B] text-white"
                  : "bg-gray-300"
              } py-2 px-4 rounded-md`}
              onClick={() => handleTabClick("admin")}
            >
              Admin
            </button>
            <button
              className={`${
                activeTab === "tourist"
                  ? "bg-[#00796B] text-white"
                  : "bg-gray-300"
              } py-2 px-4 rounded-md`}
              onClick={() => handleTabClick("tourist")}
            >
              Tourist
            </button>
          </div>
          {activeTab === "users" && <AdminUsers userList={userList} />}
          {activeTab === "admin" && <AdminList adminList={adminList} />}
          {activeTab === "tourist" && <TouristList TouristList={touristList} />}
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
