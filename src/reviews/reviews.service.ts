import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { PlacesService } from '../places/places.service';
import { PlacesRepository } from '../places/places.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly placesService: PlacesService,
    private readonly placesRepository: PlacesRepository,
  ) {}

  async findAllByPlace(placeId: string): Promise<Review[]> {
    return this.reviewsRepository.findAllByPlace(placeId);
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async create(placeId: string, dto: CreateReviewDto): Promise<Review> {
    await this.placesService.findOne(placeId); // 404 si l'endroit n'existe pas
    const review = await this.reviewsRepository.create({
      placeId,
      authorName: dto.authorName,
      rating: dto.rating,
      comment: dto.comment,
    });
    await this.refreshPlaceStats(placeId);
    return review;
  }

  async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewsRepository.updateById(id, dto);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    await this.refreshPlaceStats(review.placeId);
    return review;
  }

  async remove(id: string): Promise<void> {
    const review = await this.reviewsRepository.deleteById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    await this.refreshPlaceStats(review.placeId);
  }

  private async refreshPlaceStats(placeId: string): Promise<void> {
    const stats = await this.reviewsRepository.computeStats(placeId);
    await this.placesRepository.updateById(placeId, stats);
  }
}
