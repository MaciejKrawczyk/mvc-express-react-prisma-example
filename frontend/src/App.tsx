import  {useState, useEffect} from 'react';
import Book from "./components/Book.tsx";
import Modal from "./components/Modal.tsx";
import {useForm} from "react-hook-form";

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

    const {
        register,
        handleSubmit,

    } = useForm();
    
    
    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const onSubmit = (data) => {
        console.log(data)
        fetch('http://localhost:3000/books', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(() => {
            fetchBooks();
            closeModal();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <>

            <Modal onClose={closeModal} show={showModal}>

                <div className={'flex flex-col items-center justify-center'}>
                    <h3 className={'m-5 font-bold text-xl'}>add book</h3>
                    <form className={'flex flex-col items-center justify-center'} onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor={"title"}>title</label>
                        <input className={'border border-black'} defaultValue={""} type="text" {...register("title")}/>
                        <label htmlFor={"author"}>author</label>
                        <input className={'border border-black'} defaultValue={""} type="text" {...register("author")}/>
                        <button className={'text-white bg-blue-600 rounded-full px-3 py-1 m-4'} type={"submit"}>submit</button>
                    </form>
                </div>

            </Modal>

            <h1 className={'text-2xl font-bold text-center'}>Books</h1>

            <nav className={'w-full h-20 flex  items-center justify-center border border-b-black'}>
                <button className={'border border-black'} onClick={openModal}> add</button>
            </nav>

            {books.map((book: any) => (
                <Book data={book} key={book.id} fetchBooks={fetchBooks}/>
            ))}

        </>
    );
}

export default App;