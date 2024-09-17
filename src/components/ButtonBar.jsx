import React, { useMemo, useState } from "react";
import {
    items,
    groupProducts,
    setGroupProducts,
    counter,
    setCounter,
} from "./data/DataItem";
import { useStore } from "@nanostores/react";
import ModalShare from "./ModalShare";
import AddProductComponent from "./AddProductComponent";
import ModalShareWhatsapp from "./ModalShareWhatsapp";

const ButtonBar = () => {
    const $groupProducts = useStore(groupProducts);
    const $items = useStore(items);
    const $counter = useStore(counter);

    const [isModalOpenShare, setModalOpenShare] = useState(false);
    const [isModalOpenAdd, setModalOpenAdd] = useState(false);
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const openModalShare = () => setModalOpenShare(true);
    const closeModalShare = () => setModalOpenShare(false);

    const openModalAdd = () => setModalOpenAdd(true);
    const closeModalAdd = () => setModalOpenAdd(false);
    const showAddProduct = () => setAddProductVisible(true);

    const handleAddProduct = (newItem) => {
        setGroupProducts([...$groupProducts, newItem]);
        setCounter($counter);
        setAddProductVisible(false);
    };

    const handleSort = () => {
        const sortedByText = [...$groupProducts].sort((a, b) =>
            a.text.localeCompare(b.text)
        );
        const sortedProducts = sortedByText.sort((a, b) =>
            a.category.name.localeCompare(b.category.name)
        );

        setGroupProducts(sortedProducts);
    };

    // Uso de useMemo para memorizar groupedProducts
    const groupedProducts = useMemo(() => {
        const grouped = $groupProducts.reduce((acc, product) => {
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

        return Object.keys(grouped)
            .map((categoryName) => {
                const item = grouped[categoryName];
                console.log(
                    `**${categoryName}** ${
                        item.emoji
                    }\nProductos:\n ${item.products.join("\n ")}\n`
                );
                return `*${categoryName}* ${
                    item.emoji
                }\nProductos:\n ${item.products.join("\n ")}\n`;
            })
            .join("\n");
    }, [$groupProducts]);

    return (
        <>
            {$items.length > 0 ? (
                <div className="text-center" key={$counter}>
                    {isAddProductVisible && (
                        <AddProductComponent
                            onAddItem={handleAddProduct}
                            nextId={$counter}
                        />
                    )}
                    {$groupProducts.length > 0 ? (
                        <>
                            <button
                                className="sort-button mr-3 bg-indigoDye hover:text-blue-700 hover:bg-white text-white font-bold py-2 px-4 rounded-full"
                                onClick={handleSort}
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
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-sort"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M3 9l4 -4l4 4m-4 -4v14" />
                                    <path d="M21 15l-4 4l-4 -4m4 4v-14" />
                                </svg>
                            </button>
                            <ModalShareWhatsapp text={groupedProducts} />
                        </>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default ButtonBar;
