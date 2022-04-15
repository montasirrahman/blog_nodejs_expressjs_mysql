const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const routesm = require('./server/routes/user');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const {
  Article,
  Comment,
  User
} = require('./models');

const app = express();
const PORT = process.env.PORT || 3002;

// Set up Handlebars.js engine with custom helpers
const handlebars = exphbs.create({
  helpers
});

const sess = {
  secret: process.env.SESSION_SECRET || 'Replace me',
  cookie: {
    // Stored in milliseconds (1800000 === 30 minutes)
    maxAge: 1800000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


app.use(routesm);








///--------------------------
// --- RENDER ---
// Login page
app.use('/a-login', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/admin-login/index.html'));
});

// Management page
const withAuth = (req, res, next) =>  {
	if (req.session.loggedin) {
		res.redirect('/admin');
		//return res.sendFile(path.join(__dirname,'./views/management.html'));
	}
	else {
		res.redirect('/a-login');
	}
	res.end();
};



// --- DB CONNECTION ---
// Set the MySQL connection with the credentials
const cxn = mysql.createConnection({
    host: process.env.DB_HOST,
	database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Test the connection
cxn.connect(function(err) {
    if (err) throw err;
	console.log('**************************');
    console.log("Connected to the Database");
});

// --- LOGIN ROUTE ---
app.post('/loginm', (req, res) => {
	console.log(req.body);
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		cxn.query('SELECT * FROM user WHERE username = ? and password = ? ', [username, password], (error, results) => {
			if (error) throw error;

			if (results.length == 1) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/admin');
            }
            else {
				res.send('Login failed');
				console.log('***************');
				console.log('Login failed')
			}			
			res.end();
		});
	}
    else {
		res.send('Please enter the Username and Password');
		res.end();
	}
});


///---------------------------












//------------
sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});