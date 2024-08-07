// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const books = require('./data');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
    res.json(books);
});

// Task 2: Get the books based on ISBN
app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.ISBN === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 3: Get all books by the author
app.get('/books/author/:author', (req, res) => {
    const authorBooks = books.filter(b => b.author === req.params.author);
    res.json(authorBooks);
});

// Task 4: Get all books based on title
app.get('/books/title/:title', (req, res) => {
    const titleBooks = books.filter(b => b.title.toLowerCase() === req.params.title.toLowerCase());
    res.json(titleBooks);
});

// Task 5: Get a book review (modify as needed)
app.get('/books/:isbn/review', (req, res) => {
    const book = books.find(b => b.ISBN === req.params.isbn);
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 6: Register new user (mock example)
app.post('/register', (req, res) => {
    // Add registration logic here
    res.send('User registered');
});

// Task 7: Login as a registered user (mock example)
app.post('/login', (req, res) => {
    // Add login logic here
    res.send('User logged in');
});

// Task 8: Add/Modify a book review
app.post('/books/:isbn/review', (req, res) => {
    const book = books.find(b => b.ISBN === req.params.isbn);
    if (book) {
        book.reviews.push(req.body.review);
        res.json(book.reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 9: Delete a book review
app.delete('/books/:isbn/review', (req, res) => {
    const book = books.find(b => b.ISBN === req.params.isbn);
    if (book) {
        book.reviews = book.reviews.filter(r => r !== req.body.review);
        res.json("Book review deleted successfully..");
    } else {
        res.status(404).send('Book not found');
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

