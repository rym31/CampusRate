import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';
import { JsonService } from './json.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PlacesModule,
    ReviewsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, JsonService],
})
export class AppModule {}
