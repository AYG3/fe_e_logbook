import React from 'react';

const Modal = ( {isOpen, onClose, children} ) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
            &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal;