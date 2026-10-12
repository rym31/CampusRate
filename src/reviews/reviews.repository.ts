import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  findAllByPlace(placeId: string) {
    return this.reviewModel.find({ placeId }).exec();
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.reviewModel.findById(id).exec();
  }

  create(data: Partial<Review>) {
    return this.reviewModel.create(data);
  }

  async updateById(id: string, data: Partial<Review>) {
    if (!isValidObjectId(id)) return null;
    return this.reviewModel
      .findByIdAndUpdate(
        id,
        { $set: data },
        { returnDocument: 'after', runValidators: true },
      )
      .exec();
  }

  async deleteById(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async computeStats(placeId: string) {
    const [stats] = await this.reviewModel.aggregate<{
      averageRating: number;
      reviewCount: number;
    }>([
      { $match: { placeId } },
      {
        $group: {
          _id: '$placeId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);
    return stats ?? { averageRating: null, reviewCount: 0 };
  }
}
