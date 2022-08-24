import { Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { PrismaService } from '../common/prisma/prisma.service'

@Module({
  providers: [PrismaService, UserResolver]
})
export class UserModule {}
