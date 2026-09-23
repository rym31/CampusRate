import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { JsonService } from 'src/json.service';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, JsonService],
  imports: [ReviewsModule],
})
export class PlacesModule {}
