'use strict';

const Sequelize = require('sequelize');

// Initializes the book sequelize model (NOTE: Add further validation to the year property)
module.exports = sequelize => {
	class Book extends Sequelize.Model {}
	Book.init(
		{
			title: {
				type: Sequelize.STRING,
				validate: { notEmpty: { msg: '"Title" is required' } }
			},
			author: {
				type: Sequelize.STRING,
				validate: { notEmpty: { msg: '"Author" is required"' } }
			},
			genre: {
				type: Sequelize.STRING,
				validate: { notEmpty: { msg: '"Genre" is required"' } }
			},
			year: {
				type: Sequelize.INTEGER,
				validate: { notEmpty: { msg: '"Year" is required"' } }
			}
		},
		{ sequelize }
	);
	return Book;
};
