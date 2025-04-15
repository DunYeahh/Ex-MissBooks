import { loadFromStorage, makeId, saveToStorage, makeLorem } from './util.service.js'
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
    getCategories
}

// const gBooks = [
//     { 
//         id: makeId(), 
//         title: 'metus hendrerit', 
//         subtitle: 'mi est eros dapibus himenaeos', 
//         authors: [ 'Barbara Cartland' ], 
//         publishedDate: 1999, 
//         description: 'placerat nisi sodales suscipit tellus', 
//         pageCount: 713, 
//         categories: [ 'Computers', 'Hack' ], 
//         thumbnail: 'http://ca.org/books-photos/20.jpg', 
//         language: 'en', 
//         listPrice: {  
//             amount: 109, 
//             currencyCode: 'EUR', 
//             isOnSale: false 
//         }
//     }
// ]

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.authors) {
                const regExp = new RegExp(filterBy.authors, 'i')
                books = books.filter(book => regExp.test(book.authors.join(', ')))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            if (filterBy.publishedDate) {
                books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
            }
            if (filterBy.categories) {
                books = books.filter(book => book.categories.includes(filterBy.categories))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)

}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = '') {
    return { 
        title, 
        desctirtion: makeLorem(),
        thumbnail: 'http://ca.org/books-photos/20.jpg', 
        listPrice: {
            amount, 
            currencyCode: 'EUR', 
            isOnSale: false 
        } 
    }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '', authors: '', publishedDate: 1950, categories: ''}
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        // books = [
        //     _createBook('harry potter', 300),
        //     _createBook('atlas', 120),
        //     _createBook('bible', 50),
        //     _createBook('the lord of the rings', 150)
        // ]
        const books = [] 
        for (let i = 0; i < 20; i++) { 
            const book = { 
                id: utilService.makeId(), 
                title: utilService.makeLorem(2), 
                subtitle: utilService.makeLorem(4), 
                authors: [ 
                    utilService.makeLorem(1) 
                ], 
                publishedDate: utilService.getRandomIntInclusive(1950, 2024), 
                description: utilService.makeLorem(20), 
                pageCount: utilService.getRandomIntInclusive(20, 600), 
                categories: [getCategories()[utilService.getRandomIntInclusive(0, getCategories().length - 1)]], 
                thumbnail: `../assets/BooksImages/${i+1}.jpg`, 
                language: "en", 
                listPrice: { 
                    amount: utilService.getRandomIntInclusive(80, 500), 
                    currencyCode: "EUR", 
                    isOnSale: Math.random() > 0.7 
                } 
            } 
            books.push(book) 
        } 
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount = 250) {
    const book = getEmptyBook(title, amount)
    book.id = makeId()
    return book
}

function getCategories() {
    return ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'] 

}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}