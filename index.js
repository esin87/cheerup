const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

const usersController = require('./controllers/users.js');
const cheerupsController = require('./controllers/cheerups');

//instantiate express
const app = express();

//middleware configuration
//parser interprets key-value pairs in URLs
app.use(parser.urlencoded({ extended: true }));

//cors allows communication from all domains
app.use(cors());

//hand off requests on '/users' route to users controller
app.use('/users/', usersController);
//hands off requests on '/cheerups' to cheerups controller
app.use('/cheerups/', cheerupsController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
