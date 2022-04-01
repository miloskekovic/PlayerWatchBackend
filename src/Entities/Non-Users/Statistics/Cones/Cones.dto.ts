import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Cones from './Cones.interface'

@ObjectType()
export class ConesDto implements Cones {
    @Field(() => [StatsFields])
    ten_yard_shuttle: [StatsFields]

    @Field(() => [StatsFields])
    twenty_yard_shuttle: [StatsFields]

    @Field(() => [StatsFields])
    three_cone_drill: [StatsFields]

    @Field(() => [StatsFields])
    t_test: [StatsFields]
    @Field(() => [StatsFields])
    compass_agility: [StatsFields]

    @Field(() => [StatsFields])
    box_drill: [StatsFields]
}

@InputType()
export class ConesInputDto implements Cones {
    @Field(() => StatsFields, { nullable: true })
    ten_yard_shuttle: StatsFields

    @Field(() => StatsFields, { nullable: true })
    twenty_yard_shuttle: StatsFields

    @Field(() => StatsFields, { nullable: true })
    three_cone_drill: StatsFields

    @Field(() => StatsFields, { nullable: true })
    t_test: StatsFields
    @Field(() => StatsFields, { nullable: true })
    compass_agility: StatsFields

    @Field(() => StatsFields, { nullable: true })
    box_drill: StatsFields
}
