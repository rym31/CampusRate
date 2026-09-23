import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Nom de l'auteur de l\'appréciation",
      example: 'Samira'
    })
    authorName!: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiProperty({ description: "Note de l'appréciation (1 à 5)",
      example: 4
    })
    rating!: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Commentaire de l'appréciation",
      example: 'Calme et Wi-Fi stable.'
    })
    comment!: string;
}