import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Speed from './Speed.interface'

@ObjectType()
export class SpeedDto implements Speed {
    @Field(() => [StatsFields])
    ten_yard_dash: StatsFields[]

    @Field(() => [StatsFields])
    twenty_yard_dash: [StatsFields]

    @Field(() => [StatsFields])
    thirty_yard_dash: [StatsFields]

    @Field(() => [StatsFields])
    forty_yard_dash: [StatsFields]

    @Field(() => [StatsFields])
    fifty_yard_dash: [StatsFields]

    @Field(() => [StatsFields])
    sixty_yard_dash: [StatsFields]

    @Field(() => [StatsFields])
    ladder_drill: [StatsFields]
}

@InputType()
export class SpeedInputDto implements Speed {
    @Field(() => StatsFields, { nullable: true })
    ten_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    twenty_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    thirty_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    forty_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    fifty_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    sixty_yard_dash: StatsFields

    @Field(() => StatsFields, { nullable: true })
    ladder_drill: StatsFields
}
