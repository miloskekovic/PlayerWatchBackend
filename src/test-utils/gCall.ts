/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql, GraphQLSchema } from 'graphql'
import Maybe from 'graphql/tsutils/Maybe'

import { createSchema } from '../utils/createSchema'

interface Options {
    source: string
    variableValues?: Maybe<{
        [key: string]: any
    }>
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await createSchema()
    }
    return graphql({
        schema,
        source,
        variableValues,
    })
}
