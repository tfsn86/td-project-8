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
					title: 'New Book'
				});
			} else {
				throw err;
			}
		}
	})
);

// Get individual book detail form
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			res.render('update-book', { book, title: book.title });
		} else {
			res.sendStatus(404);
		}
	})
);

// Updates book information
router.post(
	'/:id',
	asyncHandler(async (req, res) => {
		let book;
		try {
			book = await Book.findByPk(req.params.id);
			if (book) {
				await book.update(req.body);
				res.redirect('/books');
			} else {
				res.sendStatus(404);
			}
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				book = Book.build(req.body);
				book.id = req.params.id;
				res.render('update-book', { book, title: book.title });
			} else {
				throw error;
			}
		}
	})
);

// Deletes a book
router.post(
	'/:id/delete',
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			await book.destroy();
			res.redirect('/books');
		} else {
			res.sendStatus(404);
		}
	})
);

module.exports = router;
