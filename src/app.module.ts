import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app/app.controller'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from './auth/guards/gql-auth.guard'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      sortSchema: true
      // context: ({ req }) => ({ headers: req.headers })
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard
    }
  ]
})
export class AppModule {}
