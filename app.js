const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(3000, () => {
	console.log('Listening on localhost 3000');
});

module.exports.app;
