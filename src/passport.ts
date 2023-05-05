import passportJWT from 'passport-jwt';
import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from './utils/dataSource';
import { User } from './entities';

const passport = require('passport');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const JWT_SECRET_KEY = 'your_jwt_secret';

const entityManager = AppDataSource.manager;

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET_KEY
        },
        async (jwtPayload: any, done: any) => {
            try {
                const user = await entityManager.findOne(User, {
                    where: {
                        email: jwtPayload.user.email
                    },
                    select: {
                        password: jwtPayload.user.passport
                    }
                });

                if (!user) {
                    return done(null, false);
                }
                return done(null, user);

            } catch (error) {
                return done(error, false);
            };
        }
    )
);

passport.serializeUser((user: any, done: any) => {
    done(null, user)
});

passport.deserializeUser((user: any, done: any) => {
    done(null, user)
});

const isUserAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (req) {
        next()
        return
    }
    res.status(401).json({ error: 'User unauthorized' })
}

export { passport, JWT_SECRET_KEY, isUserAuthorized };