

// Management page
const withAuth = (req, res, next) =>  {
	if (!req.session.loggedin) {
		res.redirect('/a-login');
		//return res.sendFile(path.join(__dirname,'./views/management.html'));
	}
	else {
		next();
	}
};

module.exports = withAuth;
