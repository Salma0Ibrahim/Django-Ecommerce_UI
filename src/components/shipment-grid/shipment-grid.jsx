import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShipment,
  deleteShipment,
} from '../../redux/action/shipment-action';
import EditShipmentModal from '../shipment-edit-modal/shipment-edit-modal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './shipment-grid.css';
import ShipmentForm from '../shipment-form/shipment-form';
import { toast } from 'react-toastify';
import Spinner from '../spinner/spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DataTable() {
  const dispatch = useDispatch();
  const { shipments, loading, error } = useSelector((state) => state.shipment);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const headerClassName = 'custom-header';

  useEffect(() => {
    dispatch(fetchShipment());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteShipment(id))
      .then(() => {
        toast.error('The Shipment has been deleted');
      })
      .catch((error) => {
        console.error('Error deleting shipment:', error);
      });
  };

  const handleAdd = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEdit = (id) => {
    const shipment = shipments.find((shipment) => shipment.id === id);
    setSelectedShipment(shipment);
    setSelectedRowId(id);
    setOpenEditModal(true);
  };

  const editColumn = {
    field: 'edit',
    headerName: 'Edit',
    headerClassName,
    width: 100,
    renderCell: (params) => (
      <button
        className="action_buttons"
        onClick={() => {
          handleEdit(params.row.id);
        }}
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
    ),
  };

  const deleteColumn = {
    field: 'delete',
    headerName: 'Delete',
    headerClassName,
    width: 100,
    renderCell: (params) => (
      <button
        className="action_buttons"
        onClick={() => handleDelete(params.row.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    ),
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName },
    { field: 'address', headerName: 'Address', width: 200, headerClassName },
    { field: 'city', headerName: 'City', width: 130, headerClassName },
    { field: 'state', headerName: 'State', width: 130, headerClassName },
    { field: 'zip_code', headerName: 'Zip Code', width: 130, headerClassName },
    { field: 'phone', headerName: 'Phone', width: 130, headerClassName },
    { field: 'country', headerName: 'Country', width: 130, headerClassName },
    editColumn,
    deleteColumn,
  ];

  return (
    <div style={{ height: 400, width: '100%', position: 'relative' }}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <DataGrid rows={shipments} columns={columns} pageSize={5} />
          <button onClick={handleAdd} className="add_button">
            Add Shipment
          </button>
          {openAddModal && (
            <Modal
              open={openAddModal}
              onClose={handleCloseAddModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <Box sx={style}>
                <ShipmentForm onCloseModal={handleCloseAddModal} />
              </Box>
            </Modal>
          )}
          <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <Box sx={style}>
              {selectedShipment && (
                <EditShipmentModal
                  shipment={selectedShipment}
                  rowId={selectedRowId}
                  onCloseModal={handleCloseEditModal}
                />
              )}
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
