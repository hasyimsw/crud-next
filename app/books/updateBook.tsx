"use client"
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

type Book = {
    id: number;
    title: string;
    writer: string;
    price: number;
}


export default function UpdateBook(book: Book) {
    const [title, setTitle] = useState(book.title);
    const [writer, setWriter] = useState(book.writer);
    const [price, setPrice] = useState(book.price);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                writer: writer,
                price: price
            })
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

            <button className="py-2 px-4 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white shadow-md text-sm inline-flex items-center gap-x-2" onClick={handleChange}><FiEdit /></button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-base mb-4">Edit Book {book.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-semibold">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Book Name" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Writer</label>
                            <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} className="input w-full input-bordered" placeholder="Writer Name" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Price" required />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md" onClick={handleChange}><FiX /></button>
                            {!isMutating ? (
                                <button type="submit" className="py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 text-white shadow-md"><FiSave /></button>
                            ) : (
                                <button type="button" className="py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 text-white shadow-md text-sm">Updating...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
