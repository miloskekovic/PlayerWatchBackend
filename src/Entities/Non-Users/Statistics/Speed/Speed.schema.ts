import { model, Schema } from 'mongoose'

import DefaultMongooseStats from '../DefaultMongooseStats'
import MongooseStatsFields from '../MongooseStatsFields'

const SpeedSchema = new Schema({
    ten_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    twenty_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    thirty_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    forty_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    fifty_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    sixty_yard_dash: { type: MongooseStatsFields, default: DefaultMongooseStats },
    ladder_drill: { type: MongooseStatsFields, default: DefaultMongooseStats },
})

export default model('Speed', SpeedSchema)
