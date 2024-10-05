import React from "react";
import Modal from "../Modal";

const DeleteModal = ({ isOpen, onClose, onDelete, day }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this entry?</p>
      <p className='mb-4'> {day} </p>
      <div className="flex justify-end gap-4">
        <button className="p-2 bg-gray-300 rounded" onClick={onClose}>
          Cancel
        </button>
        <button className="p-2 bg-red-600 text-white rounded" onClick={onDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
