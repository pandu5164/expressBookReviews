const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let getBookListByProp = require("./auth_users.js").getBookListByProp
const public_users = express.Router();

// const getBookListByProp = (searchBy, prop) => {
//     const bookList = [];
//     for (const [key, value] of Object.entries(books)) {
//         if (value[searchBy] == prop) {
//             bookList.push(value);
//         }
//     }
//     return bookList;
// }

// Task 6
public_users.post("/register", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    // console.log('users list', users);
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    } else if (!username) {
        return res.status(400).json({ message: "Please provide username" });
    } else if (!password) {
        return res.status(400).json({ message: "Please provide password" });
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Task 1
// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented by pavan"});
    return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 10
public_users.get('/getAllBooksByPromise', function (req, res) {
    //Write your code here
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.stringify(books, null, 4))
        }, 6000)
    })
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        return res.status(200).send(successMessage);
    });
});

// Task 2
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const book_by_isbn = getBookListByProp('isbn', req.params.isbn);
    if (book_by_isbn.length) {
        return res.status(200).send(JSON.stringify(book_by_isbn, null, 4));
    } else {
        return res.status(404).json({ message: "no books found with given isbn number" });
    }
});

//Task 11
public_users.get('/isbn/getBookByIsbnPromise/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const book_by_isbn = getBookListByProp('isbn', req.params.isbn);
            if (book_by_isbn.length) {
                resolve(JSON.stringify(book_by_isbn, null, 4))
            } else {
                reject('unable to find book by isbn');
            }
        }, 6000)
    })
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        return res.status(200).send(successMessage);
    }).catch(err => {
        return res.status(404).json({ message: err })
    });
});

// Task 3
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const book_by_author = getBookListByProp('author', req.params.author);
    if (book_by_author.length) {
        return res.status(200).send(JSON.stringify(book_by_author, null, 4));
    } else {
        return res.status(404).json({ message: "no books found with given author name" });
    }
});

//Task 12
public_users.get('/author/getBookByAuthorPromise/:author', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const book_by_author = getBookListByProp('author', req.params.author);
            if (book_by_author.length) {
                resolve(JSON.stringify(book_by_author, null, 4));
            } else {
                reject("no books found with given author name");
            }
        }, 6000)
    })
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        return res.status(200).send(successMessage);
    }).catch(err => {
        return res.status(404).json({ message: err })
    });
});

// Task 4
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const book_by_title = getBookListByProp('title', req.params.title);
    if (book_by_title.length) {
        return res.status(200).send(JSON.stringify(book_by_title, null, 4));
    } else {
        return res.status(404).json({ message: "no books found with given title name" });
    }
});

//Task 13
public_users.get('/title/getBookByTitlePromise/:title', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    
    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const book_by_title = getBookListByProp('title', req.params.title);
            if (book_by_title.length) {
                resolve(JSON.stringify(book_by_title, null, 4));
            } else {
                reject("no books found with given title name");
            }
        }, 6000)
    })
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        return res.status(200).send(successMessage);
    }).catch(err => {
        return res.status(404).json({ message: err })
    });
});

// Task 5
//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const books_review_by_isbn = getBookListByProp('isbn', req.params.isbn)[0];
    if (books_review_by_isbn) {
        return res.status(200).json({ message: books_review_by_isbn['reviews'] });
    } else {
        return res.status(404).json({ message: "no books found with given isbn number" });
    }
});

module.exports.general = public_users;
module.exports.getBookListByProp = getBookListByProp;
