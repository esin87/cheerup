const express = require('express');
const parser = require('body-parser');
//const cors = require('cors');
const methodOverride = require('method-override');

const usersController = require('./controllers/users.js');
const cheerupsController = require('./controllers/cheerups');

//instantiate express
const app = express();

//middleware configuration
app.set('view engine', 'hbs');
app.use(methodOverride('_method'));

//parser interprets key-value pairs in URLs
app.use(parser.urlencoded({ extended: true }));

//configure stylesheet
app.use('/assets', express.static('public'));

//cors allows communication from all domains
//app.use(cors());

//redirect any requests to homepage

//hand off requests on '/users' route to users controller
app.use('/users/', usersController);
//hands off requests on '/cheerups' to cheerups controller
app.use('/cheerups/', cheerupsController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
