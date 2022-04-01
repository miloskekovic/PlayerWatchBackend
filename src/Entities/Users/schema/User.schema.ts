import { StatField } from './../../Non-Users/Statistics/CombinedMongooseStat'
import { Document, model, Schema, Types } from 'mongoose'

import { IUser } from '../dto/User.dto'

const userSchema = new Schema({
    firebase_id: String,
    stripe_id: String,
    email: String,
    first_name: String,
    last_name: String,
    thumbnail: String,
    city: String,
    state: String,
    street: String,
    zip: String,
    dob: String,
    gender: String,
    height: String,
    weight: String,
    school_attending: String,
    batting: String,
    throwing: String,
    phone: String,
    banner: String,
    sports: [{ sport: String, primary: String, secondary: String }],
    committed: String,
    committed_date: String,
    school_id: Types.ObjectId,
    grad_year: String,
    tokens: [String],
    chats: [{ id: Types.ObjectId, team_id: Types.ObjectId, muted: Boolean }],
    teams: [{ id: Types.ObjectId, accepted: Boolean }],
    fans: [{ id: Types.ObjectId, type: { type: String }, accepted: Boolean }],
    following: [{ id: Types.ObjectId, type: { type: String }, accepted: Boolean }],
    video_likes: [Types.ObjectId],
    videos: [{ id: Types.ObjectId, accepted: Boolean }],
    tournaments: [Types.ObjectId],
    parks: [Types.ObjectId],
    events: [Types.ObjectId],
    statistics: {
        academics: {
            act_score: StatField,
            sat_score: StatField,
            gpa: StatField,
        },
        balance: {
            stork_balance: StatField,
            stork_hands_up_parallel: StatField,
            sit_and_reach: StatField,
        },
        baseball: {
            velocity: StatField,
            spin_rate: StatField,
            exit_speed: StatField,
            pop_time: StatField,
            first_to_third: StatField,
            third_to_first: StatField,
            short_to_first: StatField,
        },
        cones: {
            ten_yard_shuttle: StatField,
            twenty_yard_shuttle: StatField,
            three_cone_drill: StatField,
            t_test: StatField,
            compass_agility: StatField,
            box_drill: StatField,
        },
        jump: {
            broad_jump: StatField,
            triple_jump: StatField,
            vertical_jump: StatField,
            one_step_vertical_jump: StatField,
            quadrant_jump: StatField,
        },
        speed: {
            ten_yard_dash: StatField,
            twenty_yard_dash: StatField,
            thirty_yard_dash: StatField,
            forty_yard_dash: StatField,
            fifty_yard_dash: StatField,
            sixty_yard_dash: StatField,
            ladder_drill: StatField,
        },
        strength: {
            bench_press: StatField,
            squat: StatField,
            deadlift: StatField,
            push_up: StatField,
            chin_up: StatField,
            sit_up: StatField,
            plank: StatField,
            grip: StatField,
            pull_up: StatField,
        },
        throws: {
            overhead_throw: StatField,
            backwards_overhead_throw: StatField,
            behind_the_head_throw: StatField,
        },
        power_score: [{ value: Number, date: String }],
    },
    consumables: [
        {
            sku: String,
            count: Number,
            receipts: [{ order_id: String, purchased_at: String, token: String, default: [] }],
            default: [],
        },
    ],
    birth_certificate: String,
})

// userSchema.pre('save', function () {
//     const { power_score } = this.statistics
//     power_score.value = Math.random() * 4999 + 1
//     power_score.date = new Date().toISOString()
// })

const UserSchema = model<IUser & Document>('User', userSchema)

export default UserSchema
