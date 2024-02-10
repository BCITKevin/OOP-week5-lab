import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import passport from "passport";
import dotenv from "dotenv";
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import 'dotenv/config';
import {userModel} from "../../models/userModel"


dotenv.config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret= process.env.GITHUB_CLIENT_SECRET;

if (clientID === undefined) {
    throw new Error("The client id is undefined");
} else if (clientSecret === undefined) {   
    throw new Error("The client secret is undefined");
}

console.log(process.env);

const githubStrategy: GitHubStrategy = new GitHubStrategy (
    {
        clientID,
        clientSecret,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
       const user: Express.User = userModel.findOrCreate(profile);
          done(null, user);
    },
); 

// passport.use(new GitHubStrategy({
//     clientID: `${process.env.GITHUB_CLIENT_ID}`,
//     clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
//     callbackURL: "http://localhost:8000/auth/github/callback"
// },
// function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
//     userModel.findOne({ clientID });
//     // userModel.findOne({ githubId: profile.id }, function (err, user) {
//     //     return done(err, user); 
//     // });
//   }
// ));

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
