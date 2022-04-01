/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import { ApolloServer, AuthenticationError, makeExecutableSchema } from 'apollo-server-express'
import * as compression from 'compression'
import * as cors from 'cors'
import { execute, subscribe } from 'graphql'
import { deflate } from 'graphql-deduplicator'
import * as depthLimit from 'graphql-depth-limit'
import { PubSub } from 'graphql-subscriptions'
import * as helmet from 'helmet'
import * as ip from 'ip'
import * as mongoose from 'mongoose'
import * as path from 'path'
import 'reflect-metadata'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import BracketSchema from './src/Entities/Non-Users/Bracket/schema/Bracket.schema'
import BugSchema from './src/Entities/Non-Users/Bug/schema/Bug.schema'
import ChatSchema from './src/Entities/Non-Users/Chat/schema/Chat.schema'
import EventSchema from './src/Entities/Non-Users/Event/Event.schema'
import FieldSchema from './src/Entities/Non-Users/Park/schema/Field.schema'
import ParkSchema from './src/Entities/Non-Users/Park/schema/Park.schema'
import PhotographSchema from './src/Entities/Non-Users/Photograph/Photograph.schema'
import PoolPlaySchema from './src/Entities/Non-Users/PoolPlay/schema/PoolPlay.schema'
import SchoolSchema from './src/Entities/Non-Users/School/School.schema'
import TeamSchema from './src/Entities/Non-Users/Team/schema/Team.schema'
import TournamentSchema from './src/Entities/Non-Users/Tournament/schema/Tournament.schema'
import VideoSchema from './src/Entities/Non-Users/Video/schema/Video.schema'
import UserSchema from './src/Entities/Users/schema/User.schema'
import createDataLoaders from './src/Non-Entities/DataLoaders/CreateDataLoaders'
import { createSession } from './src/Non-Entities/Session/Session'
import express = require('express')
import iap = require('in-app-purchase')
import LoggerSchema from './src/Non-Entities/Logger/Logger.schema'
import * as moment from 'moment'
import { readSchedule } from './src/Entities/Non-Users/LivestreamSchedule/helper/createCameraRecord'
const responseCachePlugin = require('apollo-server-plugin-response-cache')
const isDev = process.env.NODE_ENV == 'development'
// const isDev = false
export { isDev }
const pubSub = new PubSub()
const PORT = parseInt(process.env.PORT) || 4000

iap.config({
    // If you want to exclude old transaction, set this to true. Default is false:
    appleExcludeOldTransactions: true,
    // this comes from iTunes Connect (You need this to valiate subscriptions):
    applePassword: process.env.APPLE_SHARED_SECRET,

    googleServiceAccount: {
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkk8UwhbBSsJnH\nNANaL3KXoo45K4VbDJySZiX3DAVIFFlU4gGoyqqHTSfKcTpNV7n0w5l14hBchEU7\nH3B7rCgIz6NbIOPOGrgaPmce6T1qW7XrF6pIUvdfse7tdhZlqVBazcxa/q4RMKMC\nsuPZJft2I6Y+xufgDn35GT+icYOJ6mw/HzyfHVkcvt0DBBe+CTmKQltPa6RG0zAO\nH7thvjJqq5pkQMkMay6BPCE/RnLdiPCQro25UN3PblgcJRaGPmp2OfGXPkv8m43W\nm6tjVbUDPv6wEfjIXjAt9J+w02yuzDegSHX14V0LB5gEDtYYpgthhiNo3po8k1Ze\nEPcBiI4FAgMBAAECggEASPCCny46CtkB6VhGrZOwfITJ36JsppZKrEjeWoxCbzLX\nIsgQAX3SluRfCzHAigexdlKoeL6PvAYVVX191mkkSVOA7EZ9izppfy5kl6+UAomL\nbp6ZnwSina3Y8XuaQAyccK11RaA5iZC8o9LT9GozaQqNNUEhoxTczA1rifmxIOPM\nDqk0bZEOjRR9C83KEEGnMXd++V8jX328L2HM2C6bFNcKOtVuheXCFN7+PPeFu12i\nteR53qm8X8JelvJfUYmg/5CXtW+vgzdGbReiX9fy32iYPK/Wb1Lz6twiHxIpDdkX\nKNViIk9QYiVTNBViHetXRnrcNwDo2WNPUVaTDupTLQKBgQDx6QPSOjZIL4SH8mZd\nv3t7GUZuLhVexzhWtVRlZc0Je3wqxtvDivkzFieSOlKr1yv2EGhFVyTgzncTFKln\nOGC1lzPq9ouVOyNMAyb0kc7J2HygfpiRvgGvLlTpMMeGLrV3d0KeQBtXQVT1BCpA\nbWW5yW2Ouaz0u2vxJJHgaF6+5wKBgQDx4/RtI5Piw3K89uyDMKLH8GTp4Cz/T+AK\nSSNSoVoKCDeQM9GJCH+0aWPeNUVq6Uku/0AHyPdG+8Q7WtV4fT12ebhwGPNifRSx\nEcZrGdHNK/ck4GZg0emXyBwFvCKRza8auLQI/zDRiW9kPwm79KfzRAWZM/j73Mob\n4TO6BkCKMwKBgQCd9wWqwp5tlrHZQB0+PGp6oK+QBQGpaTfNzwy0RbyU45DaMg6R\nau99P4tJflI7qf8n5+De3p/TOJ8i04wnPfZQvdKGLMZLBVnwKeLHM2sv/PCssN4Z\n1VQuO3fw6gxv/5I516OlyMDRwnSipjyc45LYtcKXv4FEMhqzVaj4O88aowKBgQCu\n9a33PxOZorscGRJLdeNX8PZc/+wsI28uoWYuP0zsErN11zVJA9+y88PrluaGBQUN\nPEzpFKBfNH3kXLgpNZU+W55fXny0kTplNTEqiHtrBtD1WGZUw6BNS82RDFqI0ZhF\nILIAC+0YsmrivIHi9HyChYHzJVeDfVimv8Z1WE5YZwKBgCXYuSpesp4bYokdbWUk\nM8QVPi1yGMFt9NwW9wTFDW4qQMBn4ULoq6j0OVrqQv+nFIFTxfquJBhFiJICR0aw\nVVeAMWSeF1vKHmQum5yD2t9g48Hz9d0fZMDvvo5NE2vrm4oQM1RwHsNRm1YvOdwW\nkZX1n/6IqFo+2Aop3NQSVGRQ\n-----END PRIVATE KEY-----\n'.replace(
            /\\n/gm,
            '\n'
        ),
    },
    /* Configurations all platforms */
    test: true, // For Apple and Google Play to force Sandbox validation only
    verbose: true, // Output debug logs to stdout stream
})

const main = async () => {
    let mongoURI = process.env.MONGODB_DEVELOPMENT
    if (process.env.NODE_ENV == 'production') {
        mongoURI = process.env.MONGODB_PRODUCTION
    }
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 200,
    })
    mongoose.set('useFindAndModify', false)
    mongoose.set('debug', isDev)
    const app = express()
    app.use(
        '/graphql',
        helmet(),
        compression(),
        cors({
            origin: '*',
            credentials: true,
        })
    )
    if (!isDev) {
        app.set('trust proxy', 1)
        app.use(createSession(mongoose))
    }

    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [__dirname + '/src/**/*.resolver.ts'],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        pubSub,
        authChecker: ({ context: { req } }) => {
            return !!req.session.userID
        },
    })

    const schema = await makeExecutableSchema({ typeDefs, resolvers })

    async function logRequest(obj) {
        const { userID, day, ...rest } = obj
        await LoggerSchema.findOneAndUpdate({ userID: userID, day }, { $push: { requests: rest } }, { upsert: true })
    }

    const BASIC_LOGGING = {
        requestDidStart({ request, context }) {
            const obj = {
                userID: context.req.session?.userID || null,
                operation: request.operationName,
                variables: request.variables,
                day: moment().format('L'),
                data: null,
                time: moment().format('LTS'),
                time_ms: moment().valueOf(),
                request_errors: null,
            }
            if (request.operationName == 'IntrospectionQuery') return null
            return {
                willSendResponse({ response: { data, errors } }) {
                    obj.data = data
                    obj.request_errors = errors
                    if (errors) logRequest(obj)
                },
            }
        },
    }
    let plugins = [BASIC_LOGGING]
    if (!isDev) plugins = [responseCachePlugin({ sessionId: ({ context: { req } }) => req?.sessionID }), BASIC_LOGGING]
    const apolloServer = new ApolloServer({
        schema,
        typeDefs,
        resolvers,
        playground: true,
        introspection: true,
        cacheControl: {
            defaultMaxAge: 3,
        },
        plugins,
        formatResponse: (response, { request }) => {
            if (request.http.headers.get('inflate') && response.data && !response.data.__schema)
                return deflate(response)
            return response
        },
        tracing: isDev,
        validationRules: [() => depthLimit(11)],
        context: ({ req }) => {
            const context = {
                req,
                loaders: {
                    user: createDataLoaders(UserSchema),
                    chat: createDataLoaders(ChatSchema),
                    bracket: createDataLoaders(BracketSchema),
                    bracket_using_challonge: createDataLoaders(BracketSchema, 'challonge_id'),
                    bug: createDataLoaders(BugSchema),
                    field: createDataLoaders(FieldSchema),
                    park: createDataLoaders(ParkSchema),
                    pool_play: createDataLoaders(PoolPlaySchema),
                    school: createDataLoaders(SchoolSchema),
                    photograph: createDataLoaders(PhotographSchema),
                    // subscription: createDataLoaders(),
                    team: createDataLoaders(TeamSchema),
                    event: createDataLoaders(EventSchema),
                    event_from_pool_game: createDataLoaders(EventSchema, 'poolGameID'),
                    event_from_bracket_game: createDataLoaders(EventSchema, 'bracketGameID'),
                    tournament: createDataLoaders(TournamentSchema),
                    video: createDataLoaders(VideoSchema),
                },
            }
            return context
        },
        engine: {
            apiKey: process.env.ENGINE_API_KEY,
            rewriteError(err) {
                if (err instanceof AuthenticationError) return null
                return err
            },
        },
    })
    await iap.setup()
    apolloServer.applyMiddleware({ app, path: '/graphql' })

    const httpServer = app.listen(PORT, () => {
        if (isDev)
            console.log(`server started on: http://localhost:4000/graphql || http://${ip.address()}:4000/graphql`)
    })
    // https://developer.android.com/google/play/billing/rtdn-reference
    SubscriptionServer.create({ schema, execute, subscribe }, { server: httpServer, path: '/graphql' })
}

main()

readSchedule()
