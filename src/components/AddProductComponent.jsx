import DropdownSubjects from "./DropdownSubjects";
import { useState } from "react";
import { items } from "./data/DataItem";
import { useStore } from "@nanostores/react";

const AddProductComponent = ({ onAddItem, nextId }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const $items = useStore(items);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCategoryChange = (id, category) => {
        setSelectedCategory(category);
    };

    const handleAddClick = () => {
        if (!selectedCategory) return; // Asegúrate de que haya una categoría seleccionada

        const newItem = {
            text: inputValue,
            id: nextId,
            category: {
                name: selectedCategory.name,
                emoji: selectedCategory.emoji,
            },
        };

        onAddItem(newItem);
        setInputValue("");
        setSelectedCategory(null);
    };

    return (
        <div className="flex flex-row mb-2 p-4">
            <input
                type="text"
                className="input-text mr-2 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                value={inputValue}
                placeholder="Añade un producto"
            />
            <DropdownSubjects
                inputId={nextId}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <button
                onClick={handleAddClick}
                className="bg-indigoDye text-white py-2 px-2 rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                </svg>
            </button>
        </div>
    );
};

export default AddProductComponent;
