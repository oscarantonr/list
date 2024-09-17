import DropdownSubjects from "./DropdownSubjects";
import { useState } from "react";
import { items } from "./data/DataItem";
import { useStore } from "@nanostores/react";

const AddProductFromCatComponent = ({
    onAddItem,
    nextId,
    selectedCategory,
}) => {
    const [inputValue, setInputValue] = useState("");
    const $items = useStore(items);
    const isInputEmpty = inputValue.trim() === "";

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddClick = () => {
        if (!selectedCategory) return;

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
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddClick();
        }
    };

    return (
        <div className="flex flex-row p-4 ">
            <input
                type="text"
                className="input-text mr-2 p-2 border border-gray-300 rounded"
                onChange={handleInputChange}
                value={inputValue}
                placeholder="Añade un producto"
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleAddClick}
                className={`add-button 
                    ${
                        isInputEmpty
                            ? "bg-gray-400 hover:text-white"
                            : "bg-indigoDye hover:bg-white hover:text-indigoDye"
                    }
               font-bold py-2 px-2 rounded-full`}
                disabled={isInputEmpty}
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

export default AddProductFromCatComponent;
