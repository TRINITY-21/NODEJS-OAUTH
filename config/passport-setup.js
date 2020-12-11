const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./key')
const User = require('../models/user-model');

//cookie generating
passport.serializeUser((user,done)=>{
	done(null,user.id);
})

passport.deserializeUser((id,done)=>{
	User.findById(id).then(user=>{
	done(null,user)
	});
	
});


passport.use(
	new GoogleStrategy({
		callbackURL:'/auth/google/redirect',
		clientID:keys.google.GOOGLE_CLIENT_ID,
		clientSecret:keys.google.GOOGLE_CLIENT_SECRET
	
	}, (accessToken, refreshToken, profile, done)=>{
		 // check if user already exist
		 User.findOne({googleid:profile.id})
		 	.then(currentUser=>{
		 		if(currentUser){

		 		done(null,currentUser);
		 		}else{

			 	new User({
				username: profile.dislayName,
				googleid:profile.id,

			}).save().then(newUser=>{

				done(null,newUser);
				})
			}
		})
	})


);

