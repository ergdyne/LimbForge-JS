import passport from 'passport'
import { getRepository, getManager } from "typeorm"
//import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as express from 'express';
import { User } from '../entity/User'
import {ViewSiteAuth} from '../entity/ViewSiteAuth'
import {SiteAuth} from '../entity/SiteAuth'
import google from 'passport-google-oauth20'

//Registers the strategy with passport to connect OAuth to google. 
export default function () {
	passport.serializeUser((user: User, cb) => {
		cb(null, user.id)
	})

	passport.deserializeUser((id, cb) => {
		getRepository(User)
			.findOne({ where: { id: id } })
			.then(user => cb(null, user))
	})

	// Use google strategy
	passport.use(new google.Strategy({
		clientID: process.env.GOOGLE_KEY,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
		userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
	}, 
		function ( accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens

			const id = profile.id
			const email = profile.emails[0].value
			//Do we have an auth for this user?
			getRepository(ViewSiteAuth).findOne({ where: { hash: id } })
				.then(auth => {
					if (auth) {
						//Site auth exist, the users has signed up
						getRepository(User).findOne({where:{id:auth.userId}})
						.then(user=>{
							done(null, user)
						})
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
										siteAuth.hash = id
										await transactionalEntityManager.save(siteAuth)
									}).then(_r => {
										done(null, user)
									}).catch(err => done(null, user))//TODO not this...
								} else {
									//No -> create everything
									let newUser = new User()
									newUser.email = email

									getManager().transaction(async transactionalEntityManager => {
										await transactionalEntityManager.save(newUser)
										let siteAuth = new SiteAuth()
										siteAuth.user = newUser
										siteAuth.hash = id
										await transactionalEntityManager.save(siteAuth)
									}).then(_r => {
										done(null, newUser)
									}).catch(err => done(null, user))//TODO not this...
								}
							})
					}
				})
		}
	));
};