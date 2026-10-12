import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { toJsonOptions } from '../../common/mongo/to-json';

@Schema({ timestamps: true, versionKey: false, toJSON: toJsonOptions })
export class Review extends Document {
  @Prop({ required: true, index: true })
  placeId!: string;

  @Prop({ required: true })
  authorName!: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating!: number;

  @Prop({ required: true })
  comment!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
