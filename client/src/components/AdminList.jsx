import React from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "janesmith@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "user",
  },
  // more users...
];

const AdminList = ({ adminList }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Created
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminList &&
              adminList.length > 0 &&
              adminList.map((admin) => (
                <tr key={admin._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.username}
                        </div>
                        {/* <div className="text-sm text-gray-500">
                          {admin.username}
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
