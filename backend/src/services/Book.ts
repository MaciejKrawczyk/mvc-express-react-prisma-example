import {db} from "../model";
import {CreateBookType} from "../types";


export async function QueryListOfBooks() {
    return db.book.findMany();
}

export async function QueryBookById(id: number) {
    return db.book.findFirst({
        where: {
            id: id
        }
    });
}

export async function QueryBookByAttr(title?: string, author?: string) {

    if (title && author) {
        return db.book.findFirst({
            where: {
                title: title,
                author: author
            }
        });
    } else if (title) {
        return db.book.findFirst({
            where: {
                title: title
            }
        });
    } else if (author) {
        return db.book.findFirst({
            where: {
                author: author
            }
        });
    }

}


export async function QueryDeleteBookById(id: number) {

    return db.book.delete({
        where: {
            id: id
        }
    });

}


export async function QueryCreateBook(book: CreateBookType) {

    return db.book.create({
        data: {
            title: book.title,
            author: book.author
        }
    })

}