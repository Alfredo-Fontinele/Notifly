import { DatabaseModule } from '@infra/database/database.module'
import { HttpModule } from '@infra/http/http.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [HttpModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule {}
