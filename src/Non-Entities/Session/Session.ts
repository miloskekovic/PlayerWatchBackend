/* eslint-disable @typescript-eslint/no-var-requires */
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
import moment = require('moment')
function createSession(mongoose) {
    return session({
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: moment.duration(30, 'days').asMilliseconds(),
            touchAfter: moment.duration(1, 'days').asMilliseconds(),
        }),
        name: 'qid',
        key: 'myCookieSessionId',
        secret: process.env.SECRET_JWT_KEY,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: moment.duration(30, 'days').asMilliseconds(),
        },
    })
}

export { createSession }
