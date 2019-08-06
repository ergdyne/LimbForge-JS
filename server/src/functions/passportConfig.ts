import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as express from 'express';
import { User } from '../entity/User'

// function saveOAuthUserProfile(req: express.Request, profile: { email: string, id: string }, done) {
// 	console.log('save o auth req', req.body)
// 	console.log('profile', profile)
// 	let blah = new User()
// 	blah.id = 102
// 	return done(err, blah);
// };


export default function () {
	// Use google strategy
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_KEY,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
		userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		passReqToCallback: false //Maybe?
	},
		function (req: express.Request, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens

			console.log('profile', profile)
			const id = profile.id
			const email = profile.emails[0].value
		
			console.log('id', id, 'email', email)
			// Save the user OAuth profile
			let blah = new User()
			blah.id = 102
			done(null, blah)
		}
	));
};


// import passport from 'passport'
// import { OAuth2Strategy as GoogleStrategy, VerifyFunction, IOAuth2StrategyOption } from 'passport-google-oauth'
// import { User } from '../entity/User'
// import { SiteAuth } from '../entity/SiteAuth'
// import { getRepository } from 'typeorm';

// //TODO add in group name

// export function passportConfig(){
//   const googleConfig:IOAuth2StrategyOption = {
//     clientID: process.env.GOOGLE_KEY,
//     clientSecret: process.env.GOOGLE_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   }

//   passport.serializeUser((user: User, cb) => {
//     console.log('serialize', user)
//     cb(null, user.id)
//   })
//   passport.deserializeUser((id, cb) => {
//     console.log('deserialize', id)
//     getRepository(User)
//       .findOne({ where: { id: id } })
//       .then(user => cb(null, user))
//   })

//   function callback(accessToken, refreshToken, profile, cb){
//     console.log("Profile", profile)

//     // Create the user OAuth profile
//     var googleProfile = {
//       email: profile.email,
//       id: profile.id
//     }


//     let blah = new User()
//     blah.id = 102
//     cb(null, blah)
//     // getRepository(SiteAuth)
//     //   .findOne({ where: { hash: profile.id } })
//     //   .then(auth => {
//     //     if (auth) {
//     //       //Site auth exist, the users has signed up
//     //       const existingPlayer = auth.user
//     //       cb(null, existingPlayer)
//     //     } else {
//     //       //Site auth does not exit
//     //       //Does the email already exist?
//     //         //Yes -> create site auth
//     //         //No -> create everything
//     //         //Tough to create the group, so that will have to be manual or happen after...

//     //       cb(null, newPlayer)
//     //     }
//     //   })
//   }

//   passport.use(new GoogleStrategy(googleConfig, callback))
// }