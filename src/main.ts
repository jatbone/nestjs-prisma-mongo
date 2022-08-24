import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './common/prisma/prisma.service'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

const registerGlobalInterceptors = async (app: INestApplication) => {
  app.useGlobalInterceptors(new LoggingInterceptor())
}

const registerGlobalServices = async (app: INestApplication) => {
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await registerGlobalServices(app)
  await registerGlobalInterceptors(app)
  await app.listen(3000)
}
bootstrap()
