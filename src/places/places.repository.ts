import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Place } from './schemas/place.schema';

@Injectable()
export class PlacesRepository {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
  ) {}

  findAll(filter: Record<string, string>, skip: number, limit: number) {
    return this.placeModel.find(filter).skip(skip).limit(limit).exec();
  }

  count(filter: Record<string, string>) {
    return this.placeModel.countDocuments(filter).exec();
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.placeModel.findById(id).exec();
  }

  create(data: Partial<Place>) {
    return this.placeModel.create(data);
  }

  async updateById(id: string, data: Partial<Place>) {
    if (!isValidObjectId(id)) return null;
    return this.placeModel
      .findByIdAndUpdate(
        id,
        { $set: data },
        { returnDocument: 'after', runValidators: true },
      )
      .exec();
  }

  deleteById(id: string) {
    return this.placeModel.findByIdAndDelete(id).exec();
  }
}
