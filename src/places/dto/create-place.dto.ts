import { Category, Status } from '../place.enums';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaceDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Nom de l'endroit",
    example: 'Bibliothèque principale',
  })
  name!: string;
  @MaxLength(1000)
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

  @MaxLength(200)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Adresse de l'endroit",
    example: 'Pavillon A, local A-210',
  })
  address!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
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
