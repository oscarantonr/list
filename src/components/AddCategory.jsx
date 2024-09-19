import { useState, useEffect } from "react";
import {
    items,
    setItems,
    counter,
    setCounter,
    emojiStore,
    groupProducts,
    setGroupProducts,
} from "./data/DataItem";
import { useStore } from "@nanostores/react";
import EmojiPickerComponent from "./EmojiPickerComponent";
import ModalConfirm from "./ModalConfirm";
import AddProduct from "./AddProduct";
import ButtonBar from "./ButtonBar";
import "./style.css";
import AddProductFromCatComponent from "./AddProductFromCatComponent";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Reorder, useDragControls } from "framer-motion";

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [taskIdCounter, setTaskIdCounter] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const $emoji = useStore(emojiStore);
    const $groupProducts = useStore(groupProducts);
    const $items = useStore(items);
    const $counter = useStore(counter);

    const handleClick = () => {
        if ((newCategory || $emoji) !== "") {
            const newInput = {
                id: taskIdCounter,
                category: {
                    name: newCategory,
                    emoji: $emoji,
                },
            };
            setTaskIdCounter(taskIdCounter + 1);
            setItems([...$items, newInput]);
            setNewCategory("");
            emojiStore.set("");
        }
    };

    const handleAddProduct = (newItem) => {
        setGroupProducts([...$groupProducts, newItem]);
        setCounter($counter);
    };

    useEffect(() => {
        setGroupProducts($groupProducts);
        setIsVisible(true);
    }, [$groupProducts, $items]);

    const handleChange = (e) => {
        setNewCategory(e.target.value);
    };

    const isInputEmpty = newCategory.trim() === "";

    const handleDelete = (id) => {
        const categoryName = $items.find((input) => input.id === id);
        const categoryHasProducts = groupProducts.value.some(
            (product) => product.category.name === categoryName.category.name
        );
        if (categoryHasProducts) {
            setCategoryToDelete(categoryName);
            setModalOpen(true);
        } else {
            setItems($items.filter((input) => input.id !== id));
        }
    };

    const confirmDelete = () => {
        const categoryName = categoryToDelete.category.name;

        setItems($items.filter((input) => input.id !== categoryToDelete.id));
        setGroupProducts(
            $groupProducts.filter(
                (product) => product.category.name !== categoryName
            )
        );

        setCategoryToDelete(null);
        setModalOpen(false);
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    const controls = useDragControls();

    function startDrag(event) {
        controls.start(event);
    }

    useEffect(() => {
        // console.log("ORDEEEEN", $items);
    }, [$items]);

    return (
        <>
            <div
                className={`transition-container ${
                    isVisible ? "visible" : ""
                } flex-col w-auto mx-auto`}
            >
                <div className="flex space-between mb-5 mx-5 justify-center">
                    <input
                        type="text"
                        className="input-text mr-2 max-w-sm"
                        value={newCategory}
                        placeholder="Añade una categoría"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <EmojiPickerComponent />
                    <button
                        className={`add-button 
                    ${
                        isInputEmpty
                            ? "bg-gray-400 hover:text-white"
                            : "bg-indigoDye hover:bg-white hover:text-indigoDye"
                    }
               font-bold py-2 px-2 rounded-full`}
                        onClick={handleClick}
                        disabled={isInputEmpty}
                        title={
                            isInputEmpty
                                ? "La categoria no puede estar vacía"
                                : ""
                        }
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
                <div className={`flex flex-row justify-center mb-5`}>
                    <ButtonBar client:load />
                </div>
                <TransitionGroup className={`flex flex-wrap justify-center`}>
                    <Reorder.Group
                        axis="y"
                        values={$items}
                        onReorder={setItems}
                    >
                        {$items && $items.length > 0
                            ? $items.map((input) => (
                                  <Reorder.Item key={input.id} value={input}>
                                      <CSSTransition
                                          key={input.id}
                                          timeout={500}
                                          classNames="fade"
                                      >
                                          <div
                                              className={`h-fit w-fit product mx-2 mb-4 font-semibold text-lg bg-blueGray-50 border-2 border-white rounded-md`}
                                              onPointerDown={startDrag}
                                          >
                                              <div className="header-category bg-columbiaBlue flex justify-between py-2 pl-5 uppercase">
                                                  <span className="mr-2 text-black">
                                                      {input.category.name}
                                                      {input.category.emoji ? (
                                                          <span className="ml-2">
                                                              {
                                                                  input.category
                                                                      .emoji
                                                              }
                                                          </span>
                                                      ) : null}
                                                  </span>
                                                  <div></div>
                                                  <div>
                                                      <button
                                                          className="delete-button mr-4 text-red-90 hover:text-red-700"
                                                          onClick={() =>
                                                              handleDelete(
                                                                  input.id
                                                              )
                                                          }
                                                      >
                                                          Borrar
                                                      </button>
                                                  </div>
                                              </div>
                                              <div className="body-category bg-mintGreen">
                                                  <AddProductFromCatComponent
                                                      onAddItem={
                                                          handleAddProduct
                                                      }
                                                      rap
                                                      nextId={$counter}
                                                      selectedCategory={
                                                          input.category
                                                      }
                                                  />
                                                  <AddProduct
                                                      selectedCategory={
                                                          input.category
                                                      }
                                                  />{" "}
                                              </div>
                                          </div>
                                      </CSSTransition>
                                  </Reorder.Item>
                              ))
                            : ""}
                    </Reorder.Group>
                </TransitionGroup>
                <ModalConfirm
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    onConfirm={confirmDelete}
                />
            </div>
        </>
    );
};

export default AddCategory;
