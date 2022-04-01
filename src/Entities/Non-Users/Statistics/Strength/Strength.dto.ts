import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Strength from './Strength.interface'

@ObjectType()
export class StrengthDto implements Strength {
    //TODO add weight?
    @Field(() => [StatsFields])
    bench_press: [StatsFields]

    @Field(() => [StatsFields])
    squat: [StatsFields]

    @Field(() => [StatsFields])
    deadlift: [StatsFields]

    @Field(() => [StatsFields])
    push_up: [StatsFields]

    @Field(() => [StatsFields])
    chin_up: [StatsFields]

    @Field(() => [StatsFields])
    sit_up: [StatsFields]

    @Field(() => [StatsFields])
    pull_up: [StatsFields]

    @Field(() => [StatsFields])
    plank: [StatsFields]

    @Field(() => [StatsFields])
    grip: [StatsFields]
}

@InputType()
export class StrengthInputDto implements Strength {
    //TODO add weight?
    @Field(() => StatsFields, { nullable: true })
    bench_press: StatsFields

    @Field(() => StatsFields, { nullable: true })
    squat: StatsFields

    @Field(() => StatsFields, { nullable: true })
    deadlift: StatsFields

    @Field(() => StatsFields, { nullable: true })
    push_up: StatsFields

    @Field(() => StatsFields, { nullable: true })
    chin_up: StatsFields

    @Field(() => StatsFields, { nullable: true })
    sit_up: StatsFields

    @Field(() => StatsFields, { nullable: true })
    pull_up: StatsFields

    @Field(() => StatsFields, { nullable: true })
    plank: StatsFields

    @Field(() => StatsFields, { nullable: true })
    grip: StatsFields
}
