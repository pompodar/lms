import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
                <p>{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
