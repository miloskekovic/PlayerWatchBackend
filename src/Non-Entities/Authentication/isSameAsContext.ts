import { AuthenticationError } from 'apollo-server-express'
import { isDev } from '../../../index'
import { Context } from '../../utils/Context.interface'

export default function isSameAsContext(
    context: Context,
    userID: string,
    error = 'You are not authorized to view this information.'
): boolean {
    if (!isDev && context.req.session.userID != userID) throw new AuthenticationError(error)
    return true
}
