import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { User } from './entities/User.entity'
import { PrismaService } from '../common/prisma/prisma.service'
import { UserUpdateInput } from './dto/update-user'

@Resolver(User)
export class UserResolver {
  constructor(private prismaService: PrismaService) {}

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UserUpdateInput,
    @Context() ctx
  ): Promise<User | null> {
    const newData = {
      ...(data?.name && { name: data.name }),
      ...(data?.email && { email: data.email })
    }
    if (Object.keys(newData).length) {
      return this.prismaService.user.update({
        where: {
          id
        },
        data: newData
      })
    }

    return null
  }

  @Query(() => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany()
  }
}
