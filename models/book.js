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
				type: Sequelize.STRING
			},
			year: {
				type: Sequelize.INTEGER
			}
		},
		{ sequelize }
	);
	return Book;
};
