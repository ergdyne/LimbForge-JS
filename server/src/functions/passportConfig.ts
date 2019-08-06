import passport from 'passport'
import { getRepository, getManager } from "typeorm"
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as express from 'express';
import { User } from '../entity/User'
import SiteAuth from '../entity/SiteAuth'

export default function () {

	passport.serializeUser((user: User, cb) => {
		console.log('serialize', user)
		cb(null, user.id)
	})
	
	passport.deserializeUser((id, cb) => {
		console.log('deserialize', id)
		getRepository(User)
			.findOne({ where: { id: id } })
			.then(user => cb(null, user))
	})

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

			const id = profile.id
			const email = profile.emails[0].value
			console.log('id', id, 'email', email)

			//Do we have an auth for this user?
			getRepository(SiteAuth).findOne({ where: { hash: profile.id } })
				.then(auth => {
					if (auth) {
						//Site auth exist, the users has signed up
						const existingUser = auth.user
						console.log('existing user', existingUser)
						done(null, existingUser)
					} else {
						//Site auth does not exit
						//Does the email already exist?
						getRepository(User).findOne({ where: { email: email.toLowerCase() } })
							.then(user => {
								//Yes -> create site auth
								if (user) {
									console.log('premade user', user)
									getManager().transaction(async transactionalEntityManager => {
										let siteAuth = new SiteAuth()
										siteAuth.user = user
										//BCRYPT HERE
										siteAuth.hash = id
										await transactionalEntityManager.save(siteAuth)
									}).then(_r => {
										done(null, user)
									}).catch(err => done(null, user))//TODO not this...
								} else {
									//No -> create everything
									let newUser = new User()
									newUser.email = email
									console.log('new user', newUser)

									getManager().transaction(async transactionalEntityManager => {
										await transactionalEntityManager.save(newUser)
										let siteAuth = new SiteAuth()
										siteAuth.user = newUser
										siteAuth.hash = id
										await transactionalEntityManager.save(siteAuth)
									}).then(_r => {
										done(null, newUser)
									}).catch(err => done(null, user))//TODO not this...
									//Tough to create the group, so that will have to be manual or happen after...
									//now someone without a group will be asked to select one...
								}
							})
					}
				})
		}
	));
};