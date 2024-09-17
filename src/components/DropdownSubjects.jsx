import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { items } from "./data/DataItem";

const DropdownSubjects = ({ inputId, selectedCategory, onCategoryChange }) => {
    const $items = useStore(items);
    const [selectedOption, setSelectedOption] = useState(
        selectedCategory || ""
    );

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        const selectedOption = $items.find(
            (option) => option.category.name === selectedValue
        );

        if (selectedOption) {
            onCategoryChange(inputId, selectedOption.category);
        }
    };

    useEffect(() => {
        setSelectedOption(selectedCategory?.name || "");
    }, [selectedCategory]);

    return (
        <select
            value={selectedOption}
            onChange={handleChange}
            className="bg-moonstone border border-idigoDye rounded-md mr-2 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-3/5"
        >
            <option value="" className="bg-moonstone">
                Sin categoría
            </option>
            {$items.map((option) => (
                <option
                    key={option.id}
                    value={option.category.name}
                    className="bg-moonstone"
                >
                    {option.category.emoji
                        ? `${option.category.name}  ${option.category.emoji}`
                        : `${option.category.name}`}
                </option>
            ))}
        </select>
    );
};

export default DropdownSubjects;
