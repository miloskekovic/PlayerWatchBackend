import assert = require('assert')
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import UserSchema from '../../../Users/schema/User.schema'
import ParkSchema from '../../Park/schema/Park.schema'
import SchoolSchema from '../../School/School.schema'
import TeamSchema from '../../Team/schema/Team.schema'
import TournamentSchema from '../../Tournament/schema/Tournament.schema'
import VideoSchema from '../../Video/schema/Video.schema'
import ReportSchema from '../Report.schema'

const Reportables = new Map([
    ['school', SchoolSchema],
    ['stream', SchoolSchema],
    ['user', UserSchema],
    ['video', VideoSchema],
    ['park', ParkSchema],
    ['team', TeamSchema],
    ['tournament', TournamentSchema],
])

@Resolver()
export default class GeneralMutationsResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async report(
        @Arg('entity') entity: string,
        @Arg('id') id: string,
        @Arg('message') message: string,
        @Ctx() context: Context,
        @Arg('school_id', { nullable: true }) school_id: string
    ): Promise<boolean> {
        assert(
            Reportables.has(entity),
            'You cannot report that entity yet. Currently supported entities: [school, stream, user, video, park, team]'
        )
        if (entity == 'stream') {
            assert(school_id, "If you are reporting a stream, you must supply the school's id")

            const foundSchool = await context.loaders.school.leanDataLoader.load(school_id)
            assert(foundSchool, 'Unable to find a school with that ID')

            const foundStream = foundSchool.games.find((game) => game._id.toHexString() == id)
            assert(foundStream, 'Unable to find a stream with that ID in the school')
        } else {
            const foundEntity = await Reportables.get(entity).findById(id)
            assert(foundEntity, 'Unable to find entity with that ID')
        }
        const foundReport = await ReportSchema.findOne({ entity, id, school_id })
        if (foundReport) {
            foundReport.reports.push({ message, reporter_id: context.req.session?.userID })
            foundReport.save()
        } else {
            await ReportSchema.create({
                entity,
                id,
                school_id,
                reports: [{ message, reporter_id: context.req.session?.userID }],
            })
        }

        return true
    }
}
