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

/* Create a new book form. */
router.get('/new', (req, res) => {
	res.render('new-book', {
		book: {},
		title: 'New Book'
	});
});

/* POST new book */
router.post(
	'/new',
	asyncHandler(async (req, res) => {
		let book;
		try {
			book = await Book.create(req.body);
			res.redirect('/');
		} catch (error) {
			if (err.name === 'SequelizeValidationError') {
				res.render('new-book', {
					book: {},
					title: 'New Book',
					errors: err.errors
				});
			} else {
				throw err;
			}
		}
	})
);

// Gets book detail form
router.get('/:id', (req, res) => {});

// Updates book information
router.post('/:id', (req, res) => {});

// Deletes a book
router.get('/:id/delete', (req, res) => {});

module.exports = router;
