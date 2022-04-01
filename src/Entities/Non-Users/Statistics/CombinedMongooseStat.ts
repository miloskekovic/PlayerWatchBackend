import MongooseStatsFields from './MongooseStatsFields'
import DefaultMongooseStats from './DefaultMongooseStats'

const AverageStat = {
    min: Number,
    max: Number,
    sum: Number,
    count: Number,
    average: Number,
}
const DefaultAverageStat = {
    min: 0,
    max: 0,
    sum: 0,
    count: 0,
    average: 0,
}

export const StatField = { type: [MongooseStatsFields], default: [DefaultMongooseStats] }
export const AverageStatField = { type: AverageStat, default: DefaultAverageStat }
