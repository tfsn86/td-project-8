const express = require('express');
const router = express.Router();
const Book = require('../models/book').Book;

// Handler function to wrap each route
function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			res.status(500).send(error);
		}
	};
}

// Get full list of books
router.get('/books', (req, res) => {});

// Get the create new book form
router.get('/books/new', (req, res) => {});

// Posts a new book to the database
router.post('/books/new', (req, res) => {});

// Gets book detail form
router.get('/books/:id', (req, res) => {});

// Updates book information
router.post('/books/:id', (req, res) => {});

// Deletes a book
router.get('/books/:id/delete', (req, res) => {});
