import { useState } from "react";
import EmojiPickerComponent from "./EmojiPickerComponent";
import { textStore, emojiStore } from "./data/DataItem";

const Item = ({ id, text, onDelete }) => {
    const [currentText, setCurrentText] = useState(text);
    // const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji || null); // Initialize emoji state with initialEmoji or null
    const [inputState, setInputState] = useState({ text: "" });

    const handleChange = (event) => {
        const newText = event.target.value;
        // setCurrentText(newText);
        // onChange(newText);
        setInputState({ ...inputState, text: newText }); // Update input state
        textStore.set(newText);
        // emojiStore.set(newEmoji)
        // onChange(id, newText, emoji);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    };

    // const handleEmojiClick = (event) => {
    //     const newEmoji = event.target.value;
    //     setInputState({ ...inputState, emoji: newEmoji }); // Update input state
    //     onChange(id, text, newEmoji);
    // };

    return (
        <div key={id}>
            <input
                type="text"
                className="flex flex-row"
                value={textStore.value}
                onChange={handleChange}
            />
            {/* <EmojiPickerComponent
                onChange={handleEmojiClick}
            /> */}
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default Item;
