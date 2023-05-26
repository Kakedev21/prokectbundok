import React, { useEffect, useState } from "react";
import TouristHeader from "../components/TouristHeader";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClients } from "../features/tourist/touristSlice";

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

const Tourist = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userTourist } = useSelector((state) => state.tourist);

  useEffect(() => {
    if (!userTourist) navigate("/touristlogin");
    if (userTourist) dispatch(getClients());
  }, [navigate, dispatch]);

  const { bookings } = useSelector((state) => state.tourist);

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
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Tourist Status",
      selector: (row) => row.isDone,
      sortable: true,
    },
    {
      name: "Admin Status",
      selector: (row) => row.bookingStatus,
      sortable: true,
    },
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

  return (
    <>
      <div className="w-full h-screen bg-[#F5F5F5]">
        <header className="bg-white shadow-lg">
          <TouristHeader />
        </header>
        <div className="w-full h-screen bg-[#FF5722]">
          <div className="h-screen bg-white p-10">
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
      </div>
    </>
  );
};

export default Tourist;
