import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";

export const metadata = {
    title: 'Simple CRUD | Book List',
}

type Book = {
    id: number;
    title: string;
    writer: string;
    price: number;
}

async function getBooks() {
    const res = await fetch('http://localhost:5000/books', {
        cache: "no-store",
    });
    return res.json();
}

export default async function BookList() {
    const books: Book[] = await getBooks();

    return (
        <div className="container px-4 mx-auto min-h-screen py-10">
            <div className="py-3">
                <AddBook />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="text-base">#</th>
                        <th className="text-base">Title</th>
                        <th className="text-base">Writer</th>
                        <th className="text-base">Price</th>
                        <th className="text-base text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id} className="hover text-sm">
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.writer}</td>
                            <td>{book.price}</td>
                            <td className="flex justify-center gap-x-2">
                                <UpdateBook {...book} />
                                <DeleteBook {...book} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
