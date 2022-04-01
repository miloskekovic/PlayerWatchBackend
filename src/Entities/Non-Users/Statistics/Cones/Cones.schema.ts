import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const ConesSchema = new Schema({
    ten_yard_shuttle: { type: MongooseStatsFields, default: DefaultMongooseStats },
    twenty_yard_shuttle: { type: MongooseStatsFields, default: DefaultMongooseStats },
    three_cone_drill: { type: MongooseStatsFields, default: DefaultMongooseStats },
    t_test: { type: MongooseStatsFields, default: DefaultMongooseStats },
    compass_agility: { type: MongooseStatsFields, default: DefaultMongooseStats },
    box_drill: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Cones', ConesSchema)
