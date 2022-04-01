import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql'
import LivestreamScheduleSchema from '../LivestreamSchedule.Schema'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { LivestreamScheduleParams } from '../inputs/Livestream.params'
import deleteCloudWatchRule from '../helper/deleteCloudWatchRule'
import createCameraRecord from '../helper/createCameraRecord'

@Resolver()
export default class LivestreamScheduleMutation {
    @Mutation(() => String)
    @UseMiddleware(IsAuth)
    async createNewLivestreamSchedule(
        @Arg('updateChannelParams')
        { startTime, endTime, cameraId, schoolId, fieldId, channelId }: LivestreamScheduleParams
    ): Promise<string> {
        // assert(new Date(startTime).getTime() - new Date(endTime).getTime() > 0, 'Invalid starTime and endTime')
        console.log({ startTime, endTime, cameraId, schoolId, fieldId, channelId })
        const { name: startRuleName } = await createCameraRecord({
            channelId,
            action: 'start',
            cameraId,
            time: startTime,
        })
        const { name: endRuleName } = await createCameraRecord({
            channelId,
            action: 'stop',
            cameraId,
            time: endTime,
        })

        // store schedule to database
        const newLivestreamSchedule = new LivestreamScheduleSchema({
            startTime,
            endTime,
            startRuleName,
            endRuleName,
            schoolId,
            fieldId,
            cameraId,
        })
        const { _id } = await newLivestreamSchedule.save()
        return _id
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteLiveStreamSchedule(@Arg('liveStreamScheduleId') liveStreamScheduleId: string): Promise<boolean> {
        const { startRuleName, endRuleName } = await LivestreamScheduleSchema.findById(liveStreamScheduleId)
        await Promise.all([startRuleName, endRuleName].map((ruleName) => deleteCloudWatchRule(ruleName))).catch((e) => {
            throw new Error(e)
        })
        await LivestreamScheduleSchema.deleteOne({ _id: liveStreamScheduleId })
        return true
    }
}
