import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonService } from '../json.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  private readonly filePath: string;

  constructor(
    private jsonService: JsonService,
    private configService: ConfigService,
  ) {
    this.filePath = this.configService.get<string>('REVIEWS_FILE_PATH')!;
  }

  async findAll(): Promise<Review[]> {
    return this.jsonService.readData<Review>(this.filePath);
  }

  async findAllByPlace(placeId: string): Promise<Review[]> {
    const reviews = await this.findAll();
    return reviews.filter((review) => review.placeId === placeId);
  }

  async findOne(id: string): Promise<Review> {
    const reviews = await this.findAll();
    const review = reviews.find((review) => review.id === id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async create(placeId: string, dto: CreateReviewDto): Promise<Review> {
    const newReview: Review = {
      ...dto,
      id: Date.now().toString(),
      placeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const reviews = await this.findAll();
    reviews.push(newReview);
    await this.jsonService.writeData(this.filePath, reviews);
    return newReview;
  }

  async update(id: string, dto: Partial<CreateReviewDto>): Promise<Review> {
    const reviews = await this.findAll();
    const reviewIndex = reviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    const updatedReview = {
      ...reviews[reviewIndex],
      ...dto,
      updatedAt: new Date(),
    };
    reviews[reviewIndex] = updatedReview;
    await this.jsonService.writeData(this.filePath, reviews);
    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const reviews = await this.findAll();
    const newReviews = reviews.filter((review) => review.id !== id);
    if (newReviews.length === reviews.length) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    await this.jsonService.writeData(this.filePath, newReviews);
  }
}
