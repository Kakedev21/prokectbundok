import React, { useEffect } from "react";

const TouristProfileSection = ({ tourGuide }) => {
  return (
    <div className="bg-[#F5F5F5] h-full w-full p-10">
      <div class="container">
        <header>
          <h1 class="text-2xl font-bold text-[#424242]">Profile Information</h1>
          <p class="text-[#424242]">Fill in your profile information below.</p>
        </header>

        <main class="profile-info bg-[#F5F5F5] shadow overflow-hidden sm:rounded-lg p-8 flex flex-col justify-center">
          <dl>
            <div class="profile-info-item bg-[#F5F5F5] mb-5">
              <dt class="font-medium text-[#424242]">Name</dt>
              <dd class="text-gray-900 bg-white p-3">
                {tourGuide[0].fullName}
              </dd>
            </div>

            <div class="profile-info-item bg-[#F5F5F5]">
              <dt class="font-medium text-[#424242]">Email</dt>
              <dd class="text-gray-900 bg-white p-3">{tourGuide[0].email}</dd>
            </div>

            <div class="profile-info-item bg-[#F5F5F5] mb-5">
              <dt class="font-medium text-[#424242]">Contact</dt>
              <dd class="text-gray-900 bg-white p-3">{tourGuide[0].contact}</dd>
            </div>

            <div class="profile-info-item bg-[#F5F5F5] mb-5">
              <dt class="font-medium text-[#424242]">Address</dt>
              <dd class="text-gray-900 bg-white p-3">{tourGuide[0].address}</dd>
            </div>

            <div class="profile-info-item bg-[#F5F5F5]">
              <dt class="font-medium text-[#424242]">Profile Image</dt>
              <dd>
                <img
                  src={tourGuide[0].profile}
                  alt="Profile"
                  class="rounded-full w-24 h-24"
                />
              </dd>
            </div>

            <div class="profile-info-item bg-[#F5F5F5] mb-5">
              <dt class="font-medium text-[#424242]">Availability</dt>
              <dd class="text-gray-900 bg-white p-3">
                {tourGuide[0].isAvailable ? "Available" : "Not Available"}
              </dd>
            </div>
          </dl>

          <div class="profile-info-controls">
            <button class="update-profile-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Profile
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TouristProfileSection;
