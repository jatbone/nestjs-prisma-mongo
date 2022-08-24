import { PrismaService } from '@/common/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async guestLogin() {
    const user = await this.prismaService.user.findFirst({
      where: {
        role: Role.GUEST
      }
    })

    if (!user) {
      throw new NotFoundException()
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.name
      })
    }
  }
}
