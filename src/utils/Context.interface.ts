import { ApolloServerExpressConfig } from 'apollo-server-express'
import { Document, Types } from 'mongoose'
import { Request } from 'express'
import { IBracket } from '../Entities/Non-Users/Bracket/Bracket.interface'
import BracketGameDto from '../Entities/Non-Users/Bracket/dto/Bracket.dto'
import BugDto from '../Entities/Non-Users/Bug/dto/Bug.dto'
import IChat from '../Entities/Non-Users/Chat/Chat.interface'
import FieldDto from '../Entities/Non-Users/Park/dto/classes/types/Field.dto'
import ParkDto from '../Entities/Non-Users/Park/dto/Park.dto'
import IPark from '../Entities/Non-Users/Park/Park.interface'
import PoolPlayDto from '../Entities/Non-Users/PoolPlay/dto/PoolPlay.dto'
import IPoolPlay from '../Entities/Non-Users/PoolPlay/PoolPlay.interface'
import { AcademicsDto } from '../Entities/Non-Users/Statistics/Academics/Academics.dto'
import { BalanceDto } from '../Entities/Non-Users/Statistics/Balance/Balance.dto'
import { ConesDto } from '../Entities/Non-Users/Statistics/Cones/Cones.dto'
import { JumpDto } from '../Entities/Non-Users/Statistics/Jump/Jump.dto'
import { SpeedDto } from '../Entities/Non-Users/Statistics/Speed/Speed.dto'
import { StrengthDto } from '../Entities/Non-Users/Statistics/Strength/Strength.dto'
import { ThrowsDto } from '../Entities/Non-Users/Statistics/Throws/Throws.dto'
import TeamDto from '../Entities/Non-Users/Team/dto/Team.dto'
import { ITeam } from '../Entities/Non-Users/Team/Team.interface'
import TournamentDto from '../Entities/Non-Users/Tournament/dto/Tournament.dto'
import { ITournament } from '../Entities/Non-Users/Tournament/Tournament.interface'
import VideoDto from '../Entities/Non-Users/Video/dto/Video.dto'
import IVideo from '../Entities/Non-Users/Video/Video.interface'
import { IUser, UserDto } from '../Entities/Users/dto/User.dto'
import { ChatDto } from '../Entities/Non-Users/Chat'
import EventDto from '../Entities/Non-Users/Event/Dto/Event.dto'
import { IEvent } from '../Entities/Non-Users/Event/Event.interface'
import SchoolDto from '../Entities/Non-Users/School/dto/School.dto'
import { ISchool } from '../Entities/Non-Users/School/School.interface'
import PhotographDto from '../Entities/Non-Users/Photograph/dto/Photograph.dto'
import { IPhotograph } from '../Entities/Non-Users/Photograph/Photograph.interface'

interface LeanDataLoaderFunctions<Dto> {
    load(key: string): Promise<Dto>
    loadMany(key: string[]): Promise<Dto[]>
    prime(key: string, value: any): void
}

interface DataLoaderFunctions<MongooseDoc> {
    load(key: string): Promise<MongooseDoc>
    loadMany(key: string[]): Promise<MongooseDoc[]>
    prime(key: string, value: any): void
}

interface DataLoadersForSchema<Dto, MongooseDoc> {
    dataLoader: DataLoaderFunctions<MongooseDoc>
    leanDataLoader: LeanDataLoaderFunctions<Dto>
}

export interface Context extends ApolloServerExpressConfig {
    req: Request
    loaders: {
        user: DataLoadersForSchema<UserDto, IUser & Document>
        chat: DataLoadersForSchema<ChatDto, IChat & Document>
        bracket: DataLoadersForSchema<BracketGameDto & IBracket, Document>
        bracket_using_challonge: DataLoadersForSchema<BracketGameDto & IBracket, Document>
        bug: DataLoadersForSchema<BugDto, IChat & Document>
        field: DataLoadersForSchema<FieldDto, IChat & Document>
        park: DataLoadersForSchema<ParkDto, IPark & Document>
        pool_play: DataLoadersForSchema<PoolPlayDto, IPoolPlay & Document>
        school: DataLoadersForSchema<SchoolDto, ISchool & Document>
        photograph: DataLoadersForSchema<PhotographDto, IPhotograph & Document>
        // subscription: createDataLoaders(),
        team: DataLoadersForSchema<TeamDto, ITeam & Document>
        event: DataLoadersForSchema<EventDto, IEvent & Document>
        event_from_pool_game: DataLoadersForSchema<EventDto, IEvent & Document>
        event_from_bracket_game: DataLoadersForSchema<EventDto, IEvent & Document>
        tournament: DataLoadersForSchema<TournamentDto, ITournament & Document>
        video: DataLoadersForSchema<VideoDto, IVideo & Document>
        statistics: {
            academics: DataLoadersForSchema<AcademicsDto, IUser & Document>
            balance: DataLoadersForSchema<BalanceDto, IChat & Document>
            // baseball: DataLoadersForSchema<BracketD & IChat, Document>,
            // basketball: DataLoadersForSchema<BracketD & IChat, Document>,
            cones: DataLoadersForSchema<ConesDto, IChat & Document>
            jump: DataLoadersForSchema<JumpDto, IChat & Document>
            speed: DataLoadersForSchema<SpeedDto, IChat & Document>
            strength: DataLoadersForSchema<StrengthDto, IChat & Document>
            throws: DataLoadersForSchema<ThrowsDto, IChat & Document>
        }
    }
}
