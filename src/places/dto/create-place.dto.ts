import { Category, Status } from '../entities/place.entity';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export class CreatePlaceDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsEnum(Category)
    category!: Category;

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsOptional()
    @IsArray()
    services?: string[];

    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}