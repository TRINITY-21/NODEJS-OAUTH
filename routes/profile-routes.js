const router = require('express').Router();


const authCheck = (res,req,next)=>{
	if(!req.user){
		res.redirect('/auth/login');
	}else{
		next()
	}
}

router.get('/', authCheck,(req,res)=>{
	res.send('You re logged in and this is yah profile'+req.user.usernname)
});

module.exports = router;
