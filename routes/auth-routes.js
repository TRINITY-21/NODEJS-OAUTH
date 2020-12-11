const router = require('express').Router();
const passport = require('passport');

//Auth Login
router.get('/login', (req,res)=>{
	res.render('login');
});

// auth with google
router.get('/google', passport.authenticate('google', {
	scope:['profile']
}) 
)

// callback
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
		

	res.redirect('/profile/');
});

// auth logout
router.get('/logout', (req,res)=>{
	req.logout()
	res.redirect('logout');
});



module.exports = router;