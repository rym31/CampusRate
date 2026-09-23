import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place, Status } from './entities/place.entity';
import { JsonService } from '../json.service';

@Injectable()
export class PlacesService {
  constructor(private jsonService: JsonService) {}

  async findAll(): Promise<Place[]> {
    return this.jsonService.readData<Place>();
  }

  async findOne(id: string): Promise<Place | undefined> {
    const places = await this.findAll();
    const place = places.find((place) => place.id === id);
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const newPlace: Place = {
      ...createPlaceDto,
      id: Date.now().toString(),
      services: createPlaceDto.services ?? [],
      status: createPlaceDto.status ?? Status.ACTIVE,
      averageRating: null,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const places = await this.findAll();
    places.push(newPlace);
    await this.jsonService.writeData(places);
    return newPlace;
  }

  async update(
    id: string,
    updatePlaceDto: Partial<CreatePlaceDto>,
  ): Promise<Place | undefined> {
    const places = await this.findAll();
    const placeIndex = places.findIndex((place) => place.id === id);
    if (placeIndex === -1) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    const updatedPlace = {
      ...places[placeIndex],
      ...updatePlaceDto,
      updatedAt: new Date(),
    };
    places[placeIndex] = updatedPlace;
    await this.jsonService.writeData(places);
    return updatedPlace;
  }

  async remove(id: string): Promise<boolean> {
    const places = await this.findAll();
    const newPlaces = places.filter((place) => place.id !== id);
    if (newPlaces.length === places.length) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    await this.jsonService.writeData(newPlaces);
    return true;
  }
}
