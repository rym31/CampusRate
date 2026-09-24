import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProblemDetailsDto } from '../common/dto/problem-details.dto';

@ApiTags('Reviews')
@Controller('v1')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('places/:placeId/reviews')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Publier une appréciation pour un endroit' })
  @ApiParam({ name: 'placeId', description: "Identifiant de l'endroit" })
  @ApiCreatedResponse({ description: 'Appréciation créée' })
  @ApiBadRequestResponse({
    description: 'Données invalides.',
    type: ProblemDetailsDto,
  })
  @ApiNotFoundResponse({
    description: 'Endroit introuvable.',
    type: ProblemDetailsDto,
  })
  async create(
    @Param('placeId') placeId: string,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewsService.create(placeId, body);
  }

  @Get('places/:placeId/reviews')
  @ApiOperation({ summary: "Lister les appréciations d'un endroit" })
  @ApiParam({ name: 'placeId', description: "Identifiant de l'endroit" })
  @ApiOkResponse({ description: 'Liste des appréciations' })
  async findAllByPlace(@Param('placeId') placeId: string) {
    return this.reviewsService.findAllByPlace(placeId);
  }

  @Get('reviews/:id')
  @ApiOperation({ summary: 'Consulter une appréciation' })
  @ApiParam({ name: 'id', description: "Identifiant de l'appréciation" })
  @ApiOkResponse({ description: 'Appréciation trouvée' })
  @ApiNotFoundResponse({
    description: 'Appréciation introuvable.',
    type: ProblemDetailsDto,
  })
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch('reviews/:id')
  @ApiOperation({ summary: 'Modifier partiellement une appréciation' })
  @ApiParam({ name: 'id', description: "Identifiant de l'appréciation" })
  @ApiOkResponse({ description: 'Appréciation modifiée' })
  @ApiBadRequestResponse({
    description: 'Données invalides.',
    type: ProblemDetailsDto,
  })
  @ApiNotFoundResponse({
    description: 'Appréciation introuvable',
    type: ProblemDetailsDto,
  })
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateReviewDto>,
  ) {
    return this.reviewsService.update(id, body);
  }

  @Delete('reviews/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une appréciation' })
  @ApiParam({ name: 'id', description: "Identifiant de l'appréciation" })
  @ApiNoContentResponse({ description: 'Appréciation supprimé' })
  @ApiNotFoundResponse({
    description: 'Appréciation introuvable',
    type: ProblemDetailsDto,
  })
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
