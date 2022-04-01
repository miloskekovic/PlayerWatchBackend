import { ObjectType, Field, InputType } from 'type-graphql'
import { IsIn } from 'class-validator'

@ObjectType()
@InputType('CreatePersonalInput')
export class Personal {
    @Field()
    first_name: string

    @Field()
    last_name: string

    @Field({ nullable: true })
    dob: string

    @Field({ nullable: true })
    phone: string

    @Field({ nullable: true })
    @IsIn(['male', 'female', 'other'], { message: 'Error' })
    gender: string
}

@InputType('PersonalInput')
export class PersonalInput extends Personal {
    @Field({ nullable: true })
    first_name: string

    @Field({ nullable: true })
    last_name: string

    @Field({ nullable: true })
    dob: string

    @Field({ nullable: true })
    phone: string

    @Field({ nullable: true })
    @IsIn(['male', 'female', 'other'], { message: 'Error' })
    gender: string
}
