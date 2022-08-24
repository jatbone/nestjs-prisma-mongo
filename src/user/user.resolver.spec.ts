import { PrismaService } from '@/common/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from './user.resolver'

describe('UsersResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserResolver]
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
