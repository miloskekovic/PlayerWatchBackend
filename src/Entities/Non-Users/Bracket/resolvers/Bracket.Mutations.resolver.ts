import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import { generatePartialUrl, UpdateChallongeMatch } from '../../Tournament/service/Challonge'
import UpdateBracketGame from '../dto/classes/Bracket.Update'
import BracketSchema from '../schema/Bracket.schema'
import BracketWithChallongeGameDto from '../dto/BracketWithChallongeDto'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

@Resolver()
export class BracketMutationResolver {
    @UseMiddleware(IsAuth)
    @Mutation(() => BracketWithChallongeGameDto, {
        description:
            "Update the mongoose bracket game and the challonge bracket game. If there is a winner, pass the winning team's challonge id.",
    })
    async updateBracketGame(
        @Arg('bracket') input: UpdateBracketGame,
        @Ctx() context: Context
    ): Promise<BracketWithChallongeGameDto> {
        const { scores, tournamentID, ageGroupID, challonge_id, _id, ...rest } = input
        const foundTournament = await context.loaders.tournament.leanDataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Cannot find tournament with that ID')
        const foundMatch = await BracketSchema.findByIdAndUpdate(_id, { $set: rest }, { new: true }).lean()
        if (!foundMatch) throw new Error('Cannot find bracket with that id.')

        const foundEvent = await context.loaders.event_from_bracket_game.dataLoader.load(foundMatch._id)
        foundEvent.date = rest.date || foundEvent.date
        foundEvent.time = rest.time || foundEvent.time
        if (rest.park) foundEvent.location = rest.park
        if (rest.field) foundEvent.location += ' ' + rest.field

        if (challonge_id != foundMatch.challonge_id)
            throw new Error(
                `Challonge Match ID and the found Match's Challonge ID are incompatible. (Expected: ${foundMatch.challonge_id}. Got: ${challonge_id})`
            )

        if (scores) await UpdateChallongeMatch(generatePartialUrl(foundTournament, ageGroupID), challonge_id, scores)

        const addedRefs = []
        const removedRefs = []
        input.referees.forEach((refID) => {
            if (!foundMatch.referees.includes(refID)) {
                addedRefs.push(refID)
            }
        })
        foundMatch.referees.forEach((refID) => {
            if (!input.referees.includes(refID)) {
                removedRefs.push(refID)
            }
        })
        if (addedRefs.length != 0) {
            const foundAddedRefs = await context.loaders.user.dataLoader.loadMany(addedRefs)
            for (const ref of foundAddedRefs) {
                const foundEventIndex = ref.events.findIndex((eventID) => eventID == foundEvent._id)
                if (foundEventIndex == -1) {
                    ref.events.push(foundEvent._id)
                    ref.save()
                }
            }
        }
        if (removedRefs.length != 0) {
            const foundRemovedRefs = await context.loaders.user.dataLoader.loadMany(removedRefs)
            for (const ref of foundRemovedRefs) {
                const foundEventIndex = ref.events.findIndex((eventID) => eventID == foundEvent._id)
                if (foundEventIndex > -1) {
                    ref.events.splice(foundEventIndex, 1)
                    ref.save()
                }
            }
        }

        foundEvent.save()
        return input
    }
}
