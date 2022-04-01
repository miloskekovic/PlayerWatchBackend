import Axios from 'axios'
import { Types } from 'mongoose'
import { Context } from '../../../../utils/Context.interface'
import BracketSchema from '../../Bracket/schema/Bracket.schema'
import ParticipantsInputDto from '../dto/classes/types/Participants.GenerateBracketFromPool'
import TournamentDto from '../dto/Tournament.dto'
import { GuestTeamDto } from '../../Team/dto/Team.guest.dto'
import AgeGroupDto from '../dto/classes/types/AgeGroupDto'
import EventSchema from '../../Event/Event.schema'
import BracketGameDto from '../../Bracket/dto/Bracket.dto'
import EventDto from '../../Event/Dto/Event.dto'

export interface ChallongeParticipantInput {
    name: string
    seed: number
    misc: string
}

export interface ChallongePreParticipantObject {
    [key: string]: ChallongePreParticipant
}

export interface ChallongePreParticipant {
    _id: string
    owner?: string
    name: string
    seed: number
}

export interface ChallongeMatch {
    match: {
        attachment_count?: number
        created_at: string
        group_id?: number
        has_attachment: boolean
        id: number
        identifier: string
        location?: string
        loser_id?: number
        player1_id: number
        player2_id: number
        round: number
        scheduled_time?: string
        started_at: string
        state: string
        tournament_id: number
        underway_at?: string
        updated_at: string
        winner_id?: number
        prerequisite_match_ids_csv: string
        scores_csv: string
        completed_at?: string
    }
}
export interface ChallongeReturn {
    totalMatches: number
    participants: ChallongeParticipant[]
    filtered: ChallongeMatch[]
}
export interface ChallongeParticipant {
    id: number
    name: string
    misc: string
}

export function generatePartialUrl(
    { _id: tournamentID, age_groups }: TournamentDto,
    ageGroupID: string | Types.ObjectId
): string {
    const foundAgeGroup = age_groups.find(({ _id }) => _id.toString() === ageGroupID.toString())
    if (!foundAgeGroup) throw new Error('cannot find age group with that ID in the tournament')
    const { age_group, classification } = foundAgeGroup
    return `${tournamentID}_${age_group}_${classification.replace(/[-\s]/g, '_')}`
}

export const CreateChallongeTournament = async (tournament: TournamentDto, ageGroup: AgeGroupDto): Promise<string> => {
    const url = generatePartialUrl(tournament, ageGroup._id)
    console.log({ url })
    const createBody = {
        name: `${tournament._id}`,
        game: `${tournament.sport}`,
        start_at: new Date().toISOString(),
        url,
        tournament_type: ageGroup.type,
    }
    try {
        const {
            data: {
                tournament: { full_challonge_url },
            },
        } = await Axios.post(
            `https://api.challonge.com/v1/tournaments.json?api_key=${process.env.CHALLONGE_API_KEY}`,
            createBody
        )
        return full_challonge_url
    } catch (e) {
        // console.log(e.response)
        if (e.response.status == 422) return `https://challonge.com/${url}`
        else throw new Error(JSON.stringify(e).replace(process.env.CHALLONGE_API_KEY, '***'))
    }
}

interface CreateChallongeParticipantsInput {
    teamIDs?: string[]
    participants?: ParticipantsInputDto[]
    context: Context
    guestTeams?: GuestTeamDto[]
}

export const CreateChallongeParticipants = async (
    input: CreateChallongeParticipantsInput
): Promise<ChallongeParticipantInput[]> => {
    const { teamIDs = [], participants = [], context, guestTeams = [] } = input
    const combinedLength = teamIDs.length + participants.length + guestTeams.length
    if (combinedLength < 3) return []
    let foundTeams = (await context.loaders.team.leanDataLoader.loadMany(teamIDs)).filter((item) => item)
    foundTeams = foundTeams.concat(
        (await context.loaders.team.leanDataLoader.loadMany(participants.map(({ id }) => id))).filter((item) => item)
    )
    const checkDupName: ChallongePreParticipantObject = {}
    let newTeamName
    let participantObject
    let foundParticipant
    await Promise.all(
        foundTeams.map(async (team) => {
            const { _id, name, owner } = team
            participantObject = { _id: _id.toString(), owner: owner.toString(), name, seed: 1 }
            if (`${name}` in checkDupName) {
                const { first_name, last_name } = await context.loaders.user.leanDataLoader.load(owner.toHexString())
                newTeamName = `${name} (${last_name}, ${first_name})`
                checkDupName[newTeamName] = participantObject
            } else {
                checkDupName[name] = participantObject
                foundParticipant = participants.find(({ id }) => _id.toString() == id.toString())
                if (foundParticipant) checkDupName[name].seed = foundParticipant.poolPlayIndex + 1
            }
        })
    )
    await Promise.all(
        guestTeams.map(async (team) => {
            const { _id, name } = team
            participantObject = { _id: _id.toString(), name, seed: 1 }
            if (name in checkDupName) checkDupName[`${name} (Guest)`] = participantObject
            else {
                checkDupName[name] = participantObject
                foundParticipant = participants.find(({ id }) => _id.toString() == id.toString())
                if (foundParticipant) checkDupName[name].seed = foundParticipant.poolPlayIndex + 1
            }
        })
    )
    const converted = Object.values(checkDupName).map(({ name, seed, _id }) => ({ name, seed, misc: _id }))
    // const sorted = converted.sort(({ seed: a }, { seed: b }) => a - b)
    return converted.reverse()
}

async function BulkAddParticipants(partialUrl: string, participants: ChallongeParticipantInput[]) {
    if (participants.length < 3) return false
    try {
        await Axios.post(
            `https://api.challonge.com/v1/tournaments/${partialUrl}/participants/bulk_add.json?api_key=${process.env.CHALLONGE_API_KEY}`,
            { participants }
        )
    } catch (e) {
        console.log(e.response.data)
        throw new Error('AddChallongeParticipants Error:' + ' ' + e.response.data.errors)
    }
    return true
}

async function StartTournament(partialUrl: string) {
    try {
        await Axios.post(
            `https://api.challonge.com/v1/tournaments/${partialUrl}/start.json?api_key=${process.env.CHALLONGE_API_KEY}`
        )
    } catch (e) {
        console.log(e.response.data)
        throw new Error('Cannot start a tournament: ' + e.response.data.errors)
    }
}

async function GetTournamentMatches(partialUrl: string) {
    try {
        const {
            data: {
                tournament: { matches },
            },
        } = await Axios.get(
            `https://api.challonge.com/v1/tournaments/${partialUrl}.json?api_key=${process.env.CHALLONGE_API_KEY}`,
            { params: { include_matches: 1 } }
        )
        return matches
    } catch (e) {
        throw new Error(e.response.data.errors)
    }
}

export const AddChallongeParticipants = async (
    tournament: TournamentDto,
    partialUrl: string,
    participants: ChallongeParticipantInput[]
): Promise<any> => {
    await BulkAddParticipants(partialUrl, participants)
    await StartTournament(partialUrl)
    const matches = await GetTournamentMatches(partialUrl) // TODO Remove when '/start' will return matches....
    const BracketObjects = matches.map(({ match: { id } }) => ({ challonge_id: id, time: null, date: null }))
    const createdBrackets = await BracketSchema.insertMany(BracketObjects)
    const EventObjects: EventDto[] = createdBrackets.map((bracket: BracketGameDto) => ({
        date: new Date().toISOString(),
        name: tournament.name,
        bracketGameID: bracket._id,
        tournamentID: tournament._id,
    }))
    await EventSchema.insertMany(EventObjects)
    return null
}

export const DeleteChallongeTournament = async (partialUrl: string): Promise<boolean> => {
    try {
        await Axios.delete(
            `https://api.challonge.com/v1/tournaments/${partialUrl}.json?api_key=${process.env.CHALLONGE_API_KEY}`
        )
        return true
    } catch ({ response: { status } }) {
        if (status == 404) return true
    } finally {
        return false
    }
}

export const GetChallongeTournament = async (partialUrl: string): Promise<ChallongeReturn> => {
    try {
        const {
            data: {
                tournament: { matches, participants },
            },
        } = await Axios.get(
            `https://api.challonge.com/v1/tournaments/${partialUrl}.json?api_key=${process.env.CHALLONGE_API_KEY}`,
            {
                params: { include_matches: 1, include_participants: 1 },
            }
        )
        return {
            totalMatches: matches.length,
            participants: participants.map(({ participant: { id, name, misc } }) => ({ id, name, misc })),
            filtered: matches.filter(({ match: { player1_id, player2_id } }) => player1_id && player2_id),
        }
    } catch (e) {
        console.log('Get Challonge Tournament Error:', e.response.data.errors)
        throw new Error(JSON.stringify(e.response.data.errors).replace(process.env.CHALLONGE_API_KEY, 'Nice Try'))
    }
}

export const UpdateChallongeMatch = async (partialUrl: string, challongeMatchID: number, scores): Promise<boolean> => {
    const { player1_score, player2_score, winner_id } = scores
    const match = { scores_csv: `${player1_score}-${player2_score}` }
    if (winner_id) match.winner_id = winner_id
    try {
        await Axios.put(`https://api.challonge.com/v1/tournaments/${partialUrl}/matches/${challongeMatchID}.json`, {
            match,
            api_key: process.env.CHALLONGE_API_KEY,
        })
    } catch (e) {
        throw new Error(`Challonge update error: ${e.response.data.errors}`)
    }
    return true
}
