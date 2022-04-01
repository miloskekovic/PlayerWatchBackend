import { ConsumableDto, FanDto } from './classes/types'
import { Types } from 'mongoose'
import { Authorized, Field, ObjectType, UseMiddleware } from 'type-graphql'

import InviteDto from '../../DTO/Invite.dto'
import { ChatDto } from '../../Non-Users/Chat/dto/Chat.dto'
import ParkDto from '../../Non-Users/Park/dto/Park.dto'
import { StatisticsDto } from '../../Non-Users/Statistics/Statistics.dto'
import TournamentDto from '../../Non-Users/Tournament/dto/Tournament.dto'
import { GetFansDto } from './classes/GetFans'
import { GetFollowingDto } from './classes/GetFollowing'
import { GetTeamsDto } from './classes/GetTeams'
import { SmallChatDto, SportDto } from './classes/types'
import EventDto from '../../Non-Users/Event/Dto/Event.dto'
import { GetVideosDto } from './classes/GetVideosDto'
import { IsAuth } from '../../../Non-Entities/Authentication/isAuth'
import { PurchasesDto } from './classes/PurchasesDto'

export interface IUser {
    _id: Types.ObjectId
    firebase_id: string
    stripe_id?: string
    email?: string
    first_name: string
    last_name: string
    thumbnail: string
    school_attending?: string
    city?: string
    state?: string
    street?: string
    zip?: string
    dob: string
    gender: string
    phone: string
    banner: string
    sports?: SportDto[]
    height?: string
    weight?: string
    batting?: string
    throwing?: string
    committed?: string
    committed_date?: string
    school_id?: Types.ObjectId
    grad_year?: string
    tokens?: string[]
    events?: Types.ObjectId[]
    full_events?: EventDto[]
    chats?: SmallChatDto[]
    full_chats?: ChatDto[]
    teams?: InviteDto[]
    full_teams?: GetTeamsDto
    fans?: FanDto[]
    full_fans?: GetFansDto
    following?: FanDto[]
    full_following?: GetFollowingDto
    video_likes?: Types.ObjectId[]
    full_video_likes?: UserDto[]
    videos?: InviteDto[]
    full_videos?: GetVideosDto
    tournaments?: Types.ObjectId[]
    full_tournaments?: TournamentDto[]
    parks?: Types.ObjectId[]
    full_parks?: ParkDto[]
    statistics?: StatisticsDto
    birth_certificate?: string
    consumables: ConsumableDto[]
}

@ObjectType()
export class UserDto implements IUser {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    @UseMiddleware(IsAuth)
    firebase_id: string
    @Field({ nullable: true })
    email?: string
    @Field({ nullable: true })
    stripe_id?: string
    @Field()
    first_name: string
    @Field({ nullable: true })
    school_attending?: string
    @Field()
    last_name: string
    @Field()
    thumbnail: string
    @Field({ nullable: true })
    city?: string
    @Field({ nullable: true })
    state?: string
    @Field({ nullable: true })
    street?: string
    @Field({ nullable: true })
    zip?: string
    @Field()
    dob: string
    @Field()
    gender: string
    @Field()
    phone: string
    @Field()
    banner: string
    @Field(() => [SportDto], { nullable: true, defaultValue: [] })
    sports?: SportDto[]
    @Field({ nullable: true })
    committed?: string
    @Field({ nullable: true })
    committed_date?: string
    @Field(() => String, { nullable: true })
    school_id?: Types.ObjectId
    @Field({ nullable: true })
    grad_year?: string
    @Field(() => [String])
    tokens?: string[]
    @Field({ nullable: true })
    birth_certificate?: string
    @Field(() => StatisticsDto)
    statistics?: StatisticsDto
    @Field(() => [ConsumableDto])
    consumables: ConsumableDto[]
    @Field({ nullable: true })
    height?: string
    @Field({ nullable: true })
    weight?: string
    @Field({ nullable: true })
    batting?: string
    @Field({ nullable: true })
    throwing?: string

    @Field(() => [String])
    events?: Types.ObjectId[]
    @Field(() => [EventDto])
    full_events?: EventDto[]

    @Field(() => [SmallChatDto])
    chats?: SmallChatDto[]
    @Field(() => [ChatDto])
    full_chats?: ChatDto[]

    @Field(() => [InviteDto])
    teams?: InviteDto[]
    @Field(() => GetTeamsDto)
    full_teams?: GetTeamsDto

    @Field(() => [FanDto])
    fans?: FanDto[]
    @Field(() => GetFansDto)
    full_fans?: GetFansDto

    @Field(() => [FanDto])
    following?: FanDto[]

    @Field(() => [String])
    video_likes?: Types.ObjectId[]
    @Field(() => [UserDto])
    full_video_likes?: UserDto[]

    @Field(() => [InviteDto])
    videos?: InviteDto[]

    @Field(() => GetVideosDto)
    full_videos?: GetVideosDto

    @Field(() => [String])
    tournaments?: Types.ObjectId[]
    @Field(() => [TournamentDto])
    full_tournaments?: TournamentDto[]

    @Field(() => [String])
    parks?: Types.ObjectId[]
    @Field(() => [ParkDto])
    full_parks?: ParkDto[]
}
