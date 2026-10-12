import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesRepository } from './places.repository';
import { Place, PlaceSchema } from './schemas/place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesRepository],
  exports: [PlacesService, PlacesRepository],
})
export class PlacesModule {}
