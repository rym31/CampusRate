import {
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsInt,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: "Nom de l'auteur de l'appréciation",
    example: 'Samira',
  })
  authorName!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ description: "Note de l'appréciation (1 à 5)", example: 4 })
  rating!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    description: "Commentaire de l'appréciation",
    example: 'Calme et Wi-Fi stable.',
  })
  comment!: string;
}
