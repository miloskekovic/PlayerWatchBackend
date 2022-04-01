import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const StrengthSchema = new Schema({
    bench_press: { type: MongooseStatsFields, default: DefaultMongooseStats },
    squat: { type: MongooseStatsFields, default: DefaultMongooseStats },
    deadlift: { type: MongooseStatsFields, default: DefaultMongooseStats },
    push_up: { type: MongooseStatsFields, default: DefaultMongooseStats },
    chin_up: { type: MongooseStatsFields, default: DefaultMongooseStats },
    sit_up: { type: MongooseStatsFields, default: DefaultMongooseStats },
    plank: { type: MongooseStatsFields, default: DefaultMongooseStats },
    grip: { type: MongooseStatsFields, default: DefaultMongooseStats },
    pull_up: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Strength', StrengthSchema)
