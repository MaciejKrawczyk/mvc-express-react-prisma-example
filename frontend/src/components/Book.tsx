import {FC} from 'react'

interface BookProps {
    data: Book,
    fetchBooks: () => Promise<void>
}

const Book: FC<BookProps> = ({data, fetchBooks}) => {

    const deleteBook = async () => {
        try {
            const response = await fetch(`http://localhost:3000/books/${data.id}`, {
                method: 'DELETE'
            })
            const responseData = await response.json()
            console.log(responseData)
            fetchBooks()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className={'border border-black w-56 h-48 bg-red-300'}>
            <p>{data.title}</p>
            <p>{data.author}</p>
            <button onClick={deleteBook} className={'border border-black text-red-600'}>delete</button>
        </div>
    )
}

export default Book