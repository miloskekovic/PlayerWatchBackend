import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const JumpSchema = new Schema({
    broad_jump: { type: MongooseStatsFields, default: DefaultMongooseStats },
    triple_jump: { type: MongooseStatsFields, default: DefaultMongooseStats },
    vertical_jump: { type: MongooseStatsFields, default: DefaultMongooseStats },
    one_step_vertical_jump: { type: MongooseStatsFields, default: DefaultMongooseStats },
    quadrant_jump: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Jump', JumpSchema)
