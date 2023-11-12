import React, {useState, useEffect} from 'react';
import Book from "./components/Book.tsx";
import Modal from "./components/Modal.tsx";

function App() {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/books/all');
            const data = await response.json();
            setBooks(data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    }


    return (
        <>

            <Modal onClose={closeModal} show={showModal}>
                <h3>add book</h3>
                {/*<form action="">*/}


                {/*</form>*/}
            </Modal>

            <h1>Books</h1>
            <button className={'border border-black'} onClick={openModal}> add</button>

            {books.map((book: any) => (
                <Book data={book} key={book.id} fetchBooks={fetchBooks}/>
            ))}

        </>
    );
}

export default App;