import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  email: string
}
