import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Category, Place, Status } from './entities/place.entity';
import { JsonService } from '../json.service';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class PlacesService {
  private readonly filePath: string;

  constructor(
    private jsonService: JsonService,
    private configService: ConfigService,
    private reviewsService: ReviewsService,
  ) {
    this.filePath = this.configService.get<string>('PLACES_FILE_PATH')!;
  }

  private async readAllPlaces(): Promise<Place[]> {
    return this.jsonService.readData<Place>(this.filePath);
  }

  async findAll(category?: string, page?: string, limit?: string) {
    let places = await this.readAllPlaces();

    if (category) {
      places = places.filter(
        (place) => place.category === (category as Category),
      );
    }

    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const totalItems = places.length;
    const totalPages = Math.ceil(totalItems / limitNum);
    const data = places.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<Place> {
    const places = await this.readAllPlaces();
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
    const places = await this.readAllPlaces();
    places.push(newPlace);
    await this.jsonService.writeData(this.filePath, places);
    return newPlace;
  }

  async update(
    id: string,
    updatePlaceDto: Partial<CreatePlaceDto>,
  ): Promise<Place> {
    const places = await this.readAllPlaces();
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
    await this.jsonService.writeData(this.filePath, places);
    return updatedPlace;
  }

  async remove(id: string): Promise<void> {
    const places = await this.readAllPlaces();
    const place = places.find((p) => p.id === id);
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    const reviews = await this.reviewsService.findAllByPlace(id);
    if (reviews.length > 0) {
      throw new ConflictException(
        `Cannot delete place with id ${id}: it has existing reviews`,
      );
    }

    const newPlaces = places.filter((p) => p.id !== id);
    await this.jsonService.writeData(this.filePath, newPlaces);
  }
}
