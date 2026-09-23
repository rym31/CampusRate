import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ProblemDetailsDto {
  @ApiProperty({ description: 'Type de problème', example: 'about:blank' })
  type!: string;

  @ApiProperty({ description: 'Titre du problème', example: 'Bad Request' })
  title!: string;

  @ApiProperty({ description: 'Statut du problème', example: 400 })
  status!: number;

  @ApiProperty({
    description: 'Détails du problème',
    example: 'Did not expect request body to be empty',
  })
  detail!: string;

  @ApiProperty({
    description: 'Instance du problème',
    example: '/v1/reviews',
  })
  instance!: string;
}
