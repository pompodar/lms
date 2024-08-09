import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, users }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-green-500 hover:text-green-600">
                    &times;
                </button>
                <h3 className="text-lg text-indigo-500 font-semibold mb-4">Share Course</h3>
                <form onSubmit={onSubmit}>
                    <label htmlFor="user_ids" className="block mb-2 text-green-500">Share with Users:</label>
                    <select multiple name="user_ids[]" id="user_ids" className="form-control w-full mb-4 text-orange-500 border-indigo-500 rounded-lg shadow-lg">
                        {users.map(user => (
                            <option className="cursor-pointer" key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Share</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
