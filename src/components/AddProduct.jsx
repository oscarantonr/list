import { useStore } from "@nanostores/react";
import DropdownSubjects from "./DropdownSubjects";
import { groupProducts, setGroupProducts } from "./data/DataItem";

const AddProduct = ({ selectedCategory }) => {
    const $groupProducts = useStore(groupProducts);

    // Filtra los productos que pertenecen a la categoría seleccionada
    const filteredProducts = $groupProducts.filter(
        (product) => product.category.name === selectedCategory.name
    );

    const handleProductChange = (id, text) => {
        setGroupProducts(
            $groupProducts.map((product) =>
                product.id === id ? { ...product, text } : product
            )
        );
    };

    const handleCategoryChange = (id, category) => {
        setGroupProducts(
            $groupProducts.map((product) =>
                product.id === id ? { ...product, category } : product
            )
        );
    };

    const handleDelete = (id) => {
        setGroupProducts($groupProducts.filter((product) => product.id !== id));
    };

    return (
        <div className="container flex flex-col gap-1.25 w-full max-w-md">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div
                        className="bg-mintGreen hover:bg-hover_mintGreen rounded-lg"
                        key={product.id}
                    >
                        <div className="flex flex-row p-4">
                            <input
                                type="text"
                                className="input-text mr-2"
                                value={product.text}
                                onChange={(e) =>
                                    handleProductChange(
                                        product.id,
                                        e.target.value
                                    )
                                }
                            />
                            <DropdownSubjects
                                inputId={product.id}
                                selectedCategory={product.category}
                                onCategoryChange={handleCategoryChange}
                            />
                            <button
                                className="remove-button bg-red-600 hover:text-red-600 hover:bg-white text-white py-2 px-2 rounded-full"
                                onClick={() => handleDelete(product.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                // <div className="text-indigoDye px-4 mb-2">
                //     Añade un producto
                // </div>
                <></>
            )}
        </div>
    );
};

export default AddProduct;
