import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { JsonService } from 'src/json.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, JsonService],
})
export class PlacesModule {}
