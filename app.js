require('dotenv').config();
const express = require('express')
, app = express()
, public = require('./routes/public')
, bodyParser = require('body-parser');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next()
})

// set up BodyParser Middleware
app.use(bodyParser.json({limit: '50mb'})); // limit post data
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/public', public)


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`[Node] Server Listening on port http://localhost:${port}`)
})