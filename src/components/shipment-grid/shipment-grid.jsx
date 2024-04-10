import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShipment,
  deleteShipment,
} from "../../redux/action/shipment-action";
import EditShipmentModal from "../shipment-edit-modal/shipment-edit-modal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DataTable() {
  const dispatch = useDispatch();
  const { shipments, loading, error } = useSelector((state) => state.shipment);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchShipment());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      dispatch(deleteShipment(id))
        .then(() => {
          // Optional: Perform any additional actions after successful deletion
          console.log("Shipment deleted successfully.");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error deleting shipment:", error);
        });
    }
  };

  const handleEdit = (id) => {
    // Find the selected shipment by ID
    const shipment = shipments.find((shipment) => shipment.id === id);
    console.log(shipment);
    // Set the selected shipment in the state
    setSelectedShipment(shipment);
    setSelectedRowId(id);
    handleOpen(); // Open the modal when edit is clicked
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "zip_code", headerName: "Zip Code", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => {
              handleEdit(params.row.id);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <DataGrid
            rows={shipments}
            columns={columns}
            pageSize={5}
            // checkboxSelection
          />
          {/* Render EditShipmentModal with selected shipment as props */}
          {/* {selectedShipment && (
            <EditShipmentModal
              shipment={selectedShipment}
              rowId={selectedRowId}
            />
          )} */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {selectedShipment && (
                <EditShipmentModal
                  shipment={selectedShipment}
                  rowId={selectedRowId}
                />
              )}
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
