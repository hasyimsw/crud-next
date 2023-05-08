"use client"
import { FiBookOpen, FiSave, FiX } from "react-icons/fi";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                writer: writer,
                price: Number(price),
            })
        });

        setIsMutating(false);

        setTitle("");
        setWriter("");
        setPrice("");
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }

    return (
        <div>

            <button className="py-2 px-4 rounded-md bg-teal-500 hover:bg-teal-600 text-white text-sm inline-flex items-center gap-x-2" onClick={handleChange}><FiBookOpen />New Book</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-base mb-4">Add New Book</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-semibold">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded-md border-2 border-teal-500 outline-none" placeholder="Book Name" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Writer</label>
                            <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} className="w-full p-2 rounded-md border-2 border-teal-500 outline-none" placeholder="Writer Name" required />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 rounded-md border-2 border-teal-500 outline-none" placeholder="Price" required />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white" onClick={handleChange}><FiX /></button>
                            {!isMutating ? (
                                <button type="submit" className="py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 text-white"><FiSave /></button>
                            ) : (
                                <button type="button" className="py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm">Saving...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
