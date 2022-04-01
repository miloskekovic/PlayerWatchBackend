import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const BalanceSchema = new Schema({
    stork_balance: { type: MongooseStatsFields, default: DefaultMongooseStats },
    stork_hands_up_parallel: { type: MongooseStatsFields, default: DefaultMongooseStats },
    sit_and_reach: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Balance', BalanceSchema)
