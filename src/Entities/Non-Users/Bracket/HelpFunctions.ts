import { Context } from './../../../utils/Context.interface'
import TournamentDto from '../Tournament/dto/Tournament.dto'
import ChallongeTournamentDto from '../Tournament/dto/classes/Tournament.GetChallonge'
import { ChallongeTeam } from '../Tournament/resolvers/Tournament.Queries.resolver'
import ChallongeGameDto from '../Tournament/dto/classes/types/Game.Challonge'

export function getGuestTeamMap(tournament: TournamentDto) {
    const guestTeamMap = new Map()
    tournament.age_groups.forEach((ageGroup) => {
        ageGroup.guest_teams.forEach((guestTeam) => {
            guestTeamMap.set(guestTeam._id.toString(), guestTeam)
        })
    })
    return guestTeamMap
}

export async function getChallongeTournamentGames(
    partialUrl: string,
    totalMatches: number,
    filtered,
    participants,
    context: Context,
    guestTeamMap: Map<string, any>
) {
    const myReturn: ChallongeTournamentDto = {
        url: `https://challonge.com/${partialUrl}`,
        currentGames: [],
        pastGames: [],
        totalGames: totalMatches,
    }

    const indexedParticipants = new Map()
    participants.forEach(({ id, name, misc }) =>
        indexedParticipants.set(id, { name, mongoID: misc, thumbnail: null, challonge_id: null })
    )

    const getFormattedTeams = (team1: ChallongeTeam, team2: ChallongeTeam, scores = '0-0') => {
        return [
            {
                _id: team1.mongoID,
                isPlayer1: true,
                score: parseInt(scores.split('-')[0]),
                name: team1.name,
                thumbnail: team1.thumbnail,
                challonge_id: team1.challonge_id,
            },
            {
                _id: team2.mongoID,
                isPlayer1: false,
                score: parseInt(scores.split('-')[1]),
                name: team2.name,
                thumbnail: team2.thumbnail,
                challonge_id: team2.challonge_id,
            },
        ]
    }

    await Promise.all(
        filtered.map(async ({ match: { id, player1_id, player2_id, round, scores_csv, completed_at, winner_id } }) => {
            const foundBracketGame = await context.loaders.bracket_using_challonge.leanDataLoader.load(id)
            let foundBracketGameRefs = []
            if (foundBracketGame.referees?.length > 0)
                foundBracketGameRefs = await context.loaders.user.leanDataLoader.loadMany(foundBracketGame.referees)
            const foundParticipant1 = indexedParticipants.get(player1_id)
            if (foundParticipant1.mongoID) {
                let foundTeam
                if (guestTeamMap.has(foundParticipant1.mongoID)) foundTeam = guestTeamMap.get(foundParticipant1.mongoID)
                else foundTeam = await context.loaders.team.leanDataLoader.load(foundParticipant1.mongoID)
                if (foundTeam) foundParticipant1.thumbnail = foundTeam.thumbnail
            }
            const foundParticipant2 = indexedParticipants.get(player2_id)
            if (foundParticipant2.mongoID) {
                let foundTeam
                if (guestTeamMap.has(foundParticipant2.mongoID)) foundTeam = guestTeamMap.get(foundParticipant2.mongoID)
                else foundTeam = await context.loaders.team.leanDataLoader.load(foundParticipant2.mongoID)
                if (foundTeam) foundParticipant2.thumbnail = foundTeam.thumbnail
            }
            indexedParticipants.set(player1_id, { ...foundParticipant1, challonge_id: player1_id })
            indexedParticipants.set(player2_id, { ...foundParticipant2, challonge_id: player2_id })
            const gameObject: ChallongeGameDto = {
                ...foundBracketGame,
                full_referees: foundBracketGameRefs,
                round,
                challonge_id: id,
                teams: getFormattedTeams(
                    indexedParticipants.get(player1_id),
                    indexedParticipants.get(player2_id),
                    scores_csv || '0-0'
                ),
            }
            if (completed_at) {
                const { challonge_id } = indexedParticipants.get(winner_id)
                myReturn.pastGames.push({ ...gameObject, winner: challonge_id })
            } else myReturn.currentGames.push(gameObject)
        })
    )

    return myReturn
}
