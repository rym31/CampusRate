import { Category, Status } from '../entities/place.entity';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Nom de l'endroit",
    example: 'Bibliothèque principale',
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Description de l'endroit",
    example: 'Espace calme avec prises.',
  })
  description!: string;

  @IsNotEmpty()
  @IsEnum(Category)
  @ApiProperty({
    description: "Catégorie de l'endroit",
    enum: Category,
    example: Category.STUDY_SPACE,
  })
  category!: Category;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Adresse de l'endroit",
    example: 'Pavillon A, local A-210',
  })
  address!: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    description: "Services offerts par l'endroit",
    example: ['WIFI', 'POWER_OUTLETS', 'STUDY_ROOMS'],
  })
  services?: string[];

  @IsOptional()
  @IsEnum(Status)
  @ApiPropertyOptional({
    description: "Statut de l'endroit",
    enum: Status,
    example: Status.ACTIVE,
  })
  status?: Status;
}
