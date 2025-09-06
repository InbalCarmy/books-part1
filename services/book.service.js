import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'


const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book=> _setNextPrevBookId(book))
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextbook.id
        book.prevBookId = prevbook.id
        return book
    })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}


function getEmptyBook() {
    return {
        // id: '',
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'EUR',
            isOnSale: false
        }
    }
}

function getDefaultFilter(filterBy = { title: '', price: 0 }) {
    return { title: filterBy.title, price: filterBy.price }
}


function _createBooks() {
    const ctgs= ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books= []
    for (let i= 0; i < 20; i++) {
        const book= {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length- 1)]],
            thumbnail: `https://picsum.photos/150/200?random=${i+1}`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)

    }
    console.log('books', books)
    saveToStorage(BOOK_KEY, books)

}
