import { Context } from './../../../../utils/Context.interface'
import { Resolver, Arg, Mutation, Ctx, UseMiddleware } from 'type-graphql'
import EventDto from '../Dto/Event.dto'
import EventSchema from '../Event.schema'
import CreateEventDto from '../Dto/Types/Create'
import UpdateEventDto from '../Dto/Types/Update'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

@Resolver()
export default class EventMutationResolver {
    @Mutation(() => EventDto, {
        nullable: true,
        description:
            'If a teamID or userID is passed, it will add the created event to each of those entities. Both, neither, or one can be passed',
    })
    @UseMiddleware(IsAuth)
    async createEvent(@Arg('event') event: CreateEventDto, @Ctx() context: Context): Promise<EventDto> {
        const { teamID, userID, ...rest } = event
        const createdEvent = await EventSchema.create(rest)
        if (teamID) {
            const foundTeam = await context.loaders.team.dataLoader.load(teamID)
            foundTeam.events.push(createdEvent._id)
            foundTeam.save()
        }
        if (userID) {
            const foundUser = await context.loaders.user.dataLoader.load(userID)
            foundUser.events.push(createdEvent._id)
            foundUser.save()
        }
        return createdEvent
    }

    @Mutation(() => EventDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async updateEvent(@Arg('event') event: UpdateEventDto): Promise<EventDto> {
        return (await EventSchema.findByIdAndUpdate(event._id, { $set: event }, { new: true })).toObject()
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(IsAuth)
    async deleteEvent(
        @Arg('eventID') eventID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        const foundEvent = await context.loaders.event.dataLoader.load(eventID)

        foundUser.events = foundUser.events.filter((storedEventID) => storedEventID != foundEvent._id)
        foundUser.save()
        foundEvent.remove()
        return true
    }
}
