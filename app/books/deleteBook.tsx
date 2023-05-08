"use client"
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
    id: number;
    title: string;
    writer: string;
    price: number;
}

export default function DeleteBook(book: Book) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(bookId: number) {
        setIsMutating(true);
        await fetch(`http://localhost:5000/books/${bookId}`, {
            method: "DELETE",
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm inline-flex items-center gap-x-2" onClick={handleChange}><FiTrash2 /></button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-base mb-4">Are you sure to delete {book.title}?</h3>
                    <div className="modal-action">
                        <button type="button" className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white" onClick={handleChange}><FiX /></button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(book.id)} className="py-2 px-4 rounded-md bg-teal-500 hover:bg-teal-600 text-white"><FiCheck /></button>
                        ) : (
                            <button type="button" className="py-2 px-4 rounded-md bg-teal-500 text-white text-sm">Deleting...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
