import { Resolver, Query, Arg, Ctx, UseMiddleware } from 'type-graphql'
import EventDto from '../Dto/Event.dto'
import { Context } from '../../../../utils/Context.interface'
import EventSchema from '../Event.schema'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

@Resolver()
export default class EventQueryResolver {
    @Query(() => EventDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getEventByID(@Arg('id') id: string, @Ctx() context: Context): Promise<EventDto> {
        return await context.loaders.event.leanDataLoader.load(id)
    }

    @Query(() => [EventDto])
    @UseMiddleware(IsAuth)
    async getAllEvents(@Ctx() context: Context): Promise<EventDto[]> {
        const foundEvents = await EventSchema.find({}).lean()
        for (const event of foundEvents) context.loaders.event.leanDataLoader.prime(event._id, event)
        return foundEvents
    }
}
