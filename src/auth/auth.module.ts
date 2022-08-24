import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { JwtStrategy } from './strategies/jwt.startegy'
import { PrismaService } from '@/common/prisma/prisma.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 60
      }
    })
  ],
  providers: [PrismaService, AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
