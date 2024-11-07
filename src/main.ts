import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { envValidation } from './config/env/env-validation'

const PORT = process.env.PORT || 3333

async function bootstrap() {
  await envValidation()

  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => {
    console.log(`\nServer is running in http://localhost:${PORT} 🚀🚀🚀\n`)
  })
}

bootstrap()
