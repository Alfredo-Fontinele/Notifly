import { HttpModule } from '@infra/http/http.module'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
  ],
})
export class AppModule {}
