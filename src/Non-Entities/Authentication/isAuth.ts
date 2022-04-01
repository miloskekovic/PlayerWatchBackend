import { AuthenticationError } from 'apollo-server-express'
import { MiddlewareFn } from 'type-graphql'
import { isDev } from '../../../index'
export const IsAuth: MiddlewareFn<any> = ({ context: { req } }, next) => {
    // if (!isDev && !req.session!.userID) {
    //     next()
    //     throw new AuthenticationError('Not Authenticated')
    // }
    return next()
}
