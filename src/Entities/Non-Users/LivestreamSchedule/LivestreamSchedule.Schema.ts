import { model, Schema } from 'mongoose'

const LivestreamScheduleSchema = model(
    'LiveStreamChannel',
    new Schema({
        channelId: String,
        schoolId: String,
        fieldId: String,
        cameraId: String,
        startTime: String,
        endTime: String,
        startRuleName: String,
        endRuleName: String,
    })
)

export default LivestreamScheduleSchema
