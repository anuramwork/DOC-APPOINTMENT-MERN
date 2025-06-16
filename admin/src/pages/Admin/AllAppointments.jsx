import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import ConfirmationModal from "../../components/ConfirmationModal";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAppointments =
    statusFilter === "All"
      ? appointments
      : appointments.filter((item) => {
          if (statusFilter === "Completed") return item.isCompleted;
          if (statusFilter === "Cancelled") return item.cancelled;
          if (statusFilter === "Paid") return item.payment;
          if (statusFilter === "Pending")
            return !item.isCompleted && !item.cancelled;
          return true;
        });

  const paginatedAppointments = [...filteredAppointments]
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const openModal = (id) => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedId(null);
  };

  const handleConfirm = () => {
    cancelAppointment(selectedId);
    closeModal();
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="flex gap-3 mb-4 flex-wrap">
        {["All", "Completed", "Cancelled", "Paid", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1); // Reset to page 1 on filter change
            }}
            className={`px-4 py-1.5 text-sm border rounded-full transition-all duration-200 ${
              statusFilter === status
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {paginatedAppointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : item.payment ? (
              <div className="flex flex-col items-center gap-1">
                <p className="text-green-400 text-xs font-medium">Paid</p>
                <img
                  onClick={() => openModal(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              </div>
            ) : (
              <img
                onClick={() => openModal(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel"
              />
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div>
            <label className="mr-2">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded p-1"
            >
              {[5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ConfirmationModal
          show={modalVisible}
          title={"Cancel Appointment"}
          message={`Are you sure you want to cancel this appointment?`}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};

export default AllAppointments;
