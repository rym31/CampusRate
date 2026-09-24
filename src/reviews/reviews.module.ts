import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { JsonService } from 'src/json.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, JsonService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
