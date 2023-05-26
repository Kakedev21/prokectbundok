import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";

const AdminManagement = () => {
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
  return (
    <>
      <AdminHeader />
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
          {showAddAdminForm && <AddAdminForm />}
          {showAddTouristForm && <AddTouristForm />}
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
