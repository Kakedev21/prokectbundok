import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, editBooking } from "../features/admin/adminSlice";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      style={{
        height: "32px",
        width: "200px",
        borderRadius: "3px",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        border: "1px solid #e5e5e5",
        padding: "0 32px 0 16px",
      }}
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button
      style={{
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        height: "34px",
        width: "32px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      type="button"
      onClick={onClear}
    >
      X
    </button>
  </>
);

const AdminBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const handleApprove = (id) => {
    setStatus("Approved");
    setSelectedId(id);
  };

  const handleReject = (id) => {
    setStatus("Rejected");
    setSelectedId(id);
  };

  useEffect(() => {
    if (status && selectedId) {
      dispatch(editBooking({ id: selectedId, status })).finally(() => {
        setStatus("");
        setSelectedId(null);
      });
    }
  }, [status, selectedId, dispatch]);

  useEffect(() => {
    dispatch(getBookings());
  }, []);

  const { bookings, admin } = useSelector((state) => state.admin);

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = bookings.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Tourist",
      selector: (row) => row.touristName,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {row.status === "Pending" ? (
              <>
                <button
                  className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"
                  onClick={() => handleApprove(row._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"
                  onClick={() => handleReject(row._id)}
                >
                  Reject
                </button>
              </>
            ) : (
              <>
                {row.status === "Approved" ? <p>Approved</p> : <p>Rejected</p>}
              </>
            )}
          </div>
        </>
      ),
    },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const ExpandedComponent = ({ data }) => (
    <div className="flex justify-center flex-col items-center">
      <ul>
        <h1>Companions: </h1>
      </ul>
    </div>
  );

  useEffect(() => {
    if (!admin) {
      navigate("/adminlogin");
    }
  }, [navigate, dispatch]);

  return (
    <>
      <AdminHeader />
      <header className="bg-[#00796B] shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#212121]">
            Booking Logs
          </h1>
        </div>
      </header>
      <div className="w-full h-screen bg-[#00796B]">
        <div className="h-screen bg-[#00796B] p-5">
          <DataTable
            title="Bookings"
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          />
        </div>
      </div>
    </>
  );
};

export default AdminBookings;
