const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Book = require('../models').Book;

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
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const books = await Book.findAll({ order: [['title', 'ASC']] });
		res.render('index', {
			books,
			title: 'Books'
		});
	})
);

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

module.exports = router;
