import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlacesRepository } from './places.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './schemas/place.schema';
import { Status } from './place.enums';

@Injectable()
export class PlacesService {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async findAll(category?: string, page?: string, limit?: string) {
    const filter: Record<string, string> = {};
    if (category) {
      filter.category = category;
    }

    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    const [data, totalItems] = await Promise.all([
      this.placesRepository.findAll(filter, (pageNum - 1) * limitNum, limitNum),
      this.placesRepository.count(filter),
    ]);

    return {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
      },
    };
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placesRepository.findById(id);
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  async create(dto: CreatePlaceDto): Promise<Place> {
    return this.placesRepository.create({
      name: dto.name,
      description: dto.description,
      category: dto.category,
      address: dto.address,
      services: dto.services ?? [],
      status: dto.status ?? Status.ACTIVE,
    });
  }

  async update(id: string, dto: UpdatePlaceDto): Promise<Place> {
    const changes: Partial<Place> = {};
    if (dto.name !== undefined) changes.name = dto.name;
    if (dto.description !== undefined) changes.description = dto.description;
    if (dto.category !== undefined) changes.category = dto.category;
    if (dto.address !== undefined) changes.address = dto.address;
    if (dto.services !== undefined) changes.services = dto.services;
    if (dto.status !== undefined) changes.status = dto.status;

    const place = await this.placesRepository.updateById(id, changes);
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  async remove(id: string): Promise<void> {
    const place = await this.findOne(id);
    if (place.reviewCount > 0) {
      throw new ConflictException(
        `Cannot delete place with id ${id}: it has existing reviews`,
      );
    }
    await this.placesRepository.deleteById(id);
  }
}
