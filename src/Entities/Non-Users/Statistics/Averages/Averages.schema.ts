import { AverageStatField } from './../CombinedMongooseStat'
import { model, Schema } from 'mongoose'

const AveragesSchema = new Schema({
    academics: {
        act_score: AverageStatField,
        sat_score: AverageStatField,
        gpa: AverageStatField,
    },
    balance: {
        stork_balance: AverageStatField,
        stork_hands_up_parallel: AverageStatField,
        sit_and_reach: AverageStatField,
    },
    baseball: {
        velocity: AverageStatField,
        spin_rate: AverageStatField,
        exit_speed: AverageStatField,
        pop_time: AverageStatField,
        first_to_third: AverageStatField,
        third_to_first: AverageStatField,
        short_to_first: AverageStatField,
    },
    cones: {
        ten_yard_shuttle: AverageStatField,
        twenty_yard_shuttle: AverageStatField,
        three_cone_drill: AverageStatField,
        t_test: AverageStatField,
        compass_agility: AverageStatField,
        box_drill: AverageStatField,
    },
    jump: {
        broad_jump: AverageStatField,
        triple_jump: AverageStatField,
        vertical_jump: AverageStatField,
        one_step_vertical_jump: AverageStatField,
        quadrant_jump: AverageStatField,
    },
    speed: {
        ten_yard_dash: AverageStatField,
        twenty_yard_dash: AverageStatField,
        thirty_yard_dash: AverageStatField,
        forty_yard_dash: AverageStatField,
        fifty_yard_dash: AverageStatField,
        sixty_yard_dash: AverageStatField,
        ladder_drill: AverageStatField,
    },
    strength: {
        bench_press: AverageStatField,
        squat: AverageStatField,
        deadlift: AverageStatField,
        push_up: AverageStatField,
        chin_up: AverageStatField,
        sit_up: AverageStatField,
        plank: AverageStatField,
        grip: AverageStatField,
        pull_up: AverageStatField,
    },
    throws: {
        overhead_throw: AverageStatField,
        backwards_overhead_throw: AverageStatField,
        behind_the_head_throw: AverageStatField,
    },
})

export default model('Averages', AveragesSchema)
