import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const ThrowsSchema = new Schema({
    overhead_throw: { type: MongooseStatsFields, default: DefaultMongooseStats },
    backwards_overhead_throw: { type: MongooseStatsFields, default: DefaultMongooseStats },
    behind_the_head_throw: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Throw', ThrowsSchema)
