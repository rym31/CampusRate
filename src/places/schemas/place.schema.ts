import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category, Status } from '../place.enums';
import { toJsonOptions } from '../../common/mongo/to-json';

@Schema({ timestamps: true, versionKey: false, toJSON: toJsonOptions })
export class Place extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true, enum: Category })
  category!: Category;

  @Prop({ required: true })
  address!: string;

  @Prop({ type: [String], default: [] })
  services!: string[];

  @Prop({ enum: Status, default: Status.ACTIVE })
  status!: Status;

  @Prop({ type: Number, default: null })
  averageRating!: number | null;

  @Prop({ default: 0 })
  reviewCount!: number;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
