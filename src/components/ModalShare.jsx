import React from "react";
import "./Modal.css";

const ModalShare = ({ isOpen, onClose, children }) => {
    const productList = children.$groupProducts;
    if (!isOpen) {
        return null;
    }

    const groupedProducts = productList.reduce((acc, product) => {
        const categoryName = product.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = {
                emoji: product.category.emoji,
                products: [],
            };
        }
        acc[categoryName].products.push(product.text);
        return acc;
    }, {});

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold text-black">
                            Lista de productos
                        </h3>
                        <button
                            type="button"
                            className="modal-close-button"
                            onClick={onClose}
                        >
                            <span className="bg-transparent text-black opacity h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    <div className={`flex ${"justify-start"} p-6 pb-1`}>
                        <div
                            className={`modal-list max-w-xs rounded-lg p-2 ${"bg-whatsappGreen text-white"} shadow-md overflow-y-auto`}
                        >
                            {Object.keys(groupedProducts).map(
                                (categoryName, index) => (
                                    <React.Fragment key={index}>
                                        {/* <tr> */}
                                        <td colSpan="2">
                                            <div className="text-category text-black pl-2 uppercase font-semibold mb- mr-4 py-2 border-b border-gray-300 text-lg">
                                                {
                                                    groupedProducts[
                                                        categoryName
                                                    ].emoji
                                                }{" "}
                                                {categoryName}
                                            </div>
                                        </td>
                                        {/* </tr> */}
                                        {groupedProducts[
                                            categoryName
                                        ].products.map((text, idx) => (
                                            <tr key={idx}>
                                                <td
                                                    className="text-product text-black pt-1 pl-5 pr-4 text-base"
                                                    colSpan="2"
                                                >
                                                    {text}
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex  justify-end p-3 border-b border-solid border-blueGray-200 rounded-t">
                        <button
                            type="button"
                            className="mx-6 my-6"
                            onClick={onClose}
                        >
                            <span className="bg-transparent text-black opacity h-6 w-6 text-base block outline-none focus:outline-none">
                                Cancelar
                            </span>
                        </button>
                        <button className="bg-green-500 p-2 text-lg w-auto mx-6 my-6 rounded-full">
                            Share!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalShare;
