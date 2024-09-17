import React from "react";

const ModalConfirm = ({ isOpen, onRequestClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Modal"
            className="flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-50"
            overlayClassName=""
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-black">
                    Confirmar eliminación
                </h2>
                <p className="mb-6 text-black">
                    ¿Estás seguro de que deseas eliminar esta categoría?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Sí
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirm;
