import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import emojiAddIcon from "./icons/emoji-add.png";
import { emojiStore } from "./data/DataItem";

const EmojiPickerComponent = ({ onEmojiClick }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const pickerRef = useRef(null);

    const handleEmojiClick = (result) => {
        setSelectedEmoji(result.emoji);
        emojiStore.set(result.emoji);
        setShowEmojiPicker(false);
        if (onEmojiClick) {
            onEmojiClick(result.emoji);
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <button
                type="button"
                className="emoji-button mr-2 bg-indigoDye hover:text-indigoDye hover:bg-white text-white font-bold py-2 px-2 rounded-full"
                onClick={toggleEmojiPicker}
            >
                {emojiStore.value ? (
                    <span>{emojiStore.value}</span>
                ) : (
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-mood-plus"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20.985 12.528a9 9 0 1 0 -8.45 8.456" />
                        <path d="M16 19h6" />
                        <path d="M19 16v6" />
                        <path d="M9 10h.01" />
                        <path d="M15 10h.01" />
                        <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
                    </svg>
                )}
            </button>
            {showEmojiPicker && (
                <div ref={pickerRef} className="emoji-picker-wrapper absolute">
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        style={{ width: "auto" }}
                    />
                </div>
            )}
        </>
    );
};

export default EmojiPickerComponent;
